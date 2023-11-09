from Libros import Libros
from BigQueryClient import BigQueryClient
import flet as ft

def main(page: ft.Page):
    bigquery_client = BigQueryClient()
    libros = Libros(bigquery_client)
    libros.setup_page(page)

if __name__ == "__main__":
    ft.app(target=main)
