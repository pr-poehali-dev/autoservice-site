import json
import os
import psycopg2

SCHEMA = "t_p42101459_autoservice_site"


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Управление отзывами: получение, добавление, модерация"""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

    params = event.get("queryStringParameters") or {}

    # GET /reviews — получить одобренные отзывы
    if method == "GET" and params.get("admin") != "1":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, car, text, rating, created_at FROM {SCHEMA}.reviews WHERE approved = TRUE ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        reviews = [
            {"id": r[0], "name": r[1], "car": r[2], "text": r[3], "rating": r[4], "created_at": str(r[5])}
            for r in rows
        ]
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"reviews": reviews})}

    # GET ?admin=1 — получить все отзывы для модерации
    if method == "GET" and params.get("admin") == "1":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, car, text, rating, approved, created_at FROM {SCHEMA}.reviews ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        reviews = [
            {"id": r[0], "name": r[1], "car": r[2], "text": r[3], "rating": r[4], "approved": r[5], "created_at": str(r[6])}
            for r in rows
        ]
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"reviews": reviews})}

    # POST /reviews — оставить отзыв
    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        car = body.get("car", "").strip()
        text = body.get("text", "").strip()
        rating = int(body.get("rating", 5))

        if not name or not text:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя и текст обязательны"})}
        if rating < 1 or rating > 5:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Рейтинг от 1 до 5"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {SCHEMA}.reviews (name, car, text, rating) VALUES (%s, %s, %s, %s) RETURNING id",
            (name, car, text, rating),
        )
        review_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 201, "headers": headers, "body": json.dumps({"id": review_id, "message": "Отзыв отправлен на проверку"})}

    # PUT /reviews — одобрить/отклонить отзыв
    if method == "PUT":
        body = json.loads(event.get("body") or "{}")
        review_id = body.get("id")
        approved = body.get("approved")

        if review_id is None or approved is None:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "id и approved обязательны"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.reviews SET approved = %s WHERE id = %s",
            (approved, review_id),
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"message": "Статус обновлён"})}

    # DELETE /reviews — удалить отзыв
    if method == "DELETE":
        body = json.loads(event.get("body") or "{}")
        review_id = body.get("id")

        if not review_id:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "id обязателен"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {SCHEMA}.reviews WHERE id = %s", (review_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"message": "Отзыв удалён"})}

    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}