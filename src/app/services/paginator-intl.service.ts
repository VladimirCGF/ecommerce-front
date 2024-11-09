import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntl extends MatPaginatorIntl {

  override firstPageLabel = 'Primeira página'
  override lastPageLabel = 'Ultima página'
  override itemsPerPageLabel = 'Itens por página';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`; // Exibe "0 de 0" quando não há itens
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize + 1; // O primeiro item da página atual
    const endIndex = Math.min(startIndex + pageSize - 1, length); // O último item da página atual
    return `${startIndex} - ${endIndex} de ${length}`; // Altera "of" para "de"
  }

}

