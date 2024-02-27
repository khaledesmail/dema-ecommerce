import pandas as pd
import psycopg2

db_config = {
    'host': 'localhost',
    'port': 5432,
    'user': 'dema',
    'password': 'dema',
    'database': 'ecommerce',
}

excel_inventory_file_path = 'inventory.xlsx'

def insert_inventory_data():
    connection = psycopg2.connect(**db_config)
    cursor = connection.cursor()

    df_inventory = pd.read_excel(excel_inventory_file_path)

    for index, row in df_inventory.iterrows():
        sql = """INSERT INTO "inventory" ("productId", "name", "quantity", "category", "subCategory")
                VALUES (%s, %s, %s, %s, %s)"""
        cursor.execute(sql, tuple(row))

    connection.commit()
    connection.close()

    print('Inventory data inserted successfully')

if __name__ == "__main__":
    insert_inventory_data()
