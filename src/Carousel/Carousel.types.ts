import React from "react";

export interface CarrouselProps<T> {
  /**
   * ID optionnel pour le carrousel
   */
  id?: string;

  /**
   * Espace entre les diapositives
   */
  spaceBetween?: number;

  /**
   * Liste des éléments à afficher dans le carrousel
   */
  items: Array<T>;

  /**
   * Fonction de rendu pour chaque élément
   */
  renderItem: (item: T) => React.ReactNode;
}
