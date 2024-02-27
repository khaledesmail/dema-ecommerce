import pandas as pd
import psycopg2

db_config = {
    'host': 'localhost',
    'port': 5432,
    'user': 'dema',
    'password': 'dema',
    'database': 'ecommerce',
}

excel_file_path = 'orders.xlsx'

def insert_data():
    connection = psycopg2.connect(**db_config)
    cursor = connection.cursor()

    df = pd.read_excel(excel_file_path)

    for index, row in df.iterrows():
        sql = """INSERT INTO "order" ("orderId", "productId", "currency", "quantity", "shippingCost", "amount", "channel", "channelGroup", "campaign", "dateTime")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, tuple(row))
    connection.commit()
    connection.close()

    print('Data inserted successfully')

if __name__ == "__main__":
    insert_data()
