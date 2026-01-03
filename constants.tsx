
import { Product } from './types';

export const WHOLESALE_MIN_ORDER = 500;

// Centralizado para fácil alteração no futuro (simulando backend)
export const CATEGORIES = [
  'Raízes e Tubérculos',
  'Grãos e Cereais',
  'Temperos Naturais',
  'Bebidas Artesanais',
  'Hortifruti Orgânico',
  'Óleos e Essências',
  'Utensílios Eco'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cachaça Artesanal Raiz 700ml',
    description: 'Destilada em alambique de cobre com fermentação natural.',
    category: 'Bebidas Artesanais',
    image: 'https://images.unsplash.com/photo-1595977437232-9a0426eb64e0?q=80&w=400&auto=format&fit=crop',
    retailPrice: 45.00,
    wholesalePrice: 32.50,
    stock: 50,
    unit: 'Garrafa'
  },
  {
    id: '2',
    name: 'Mix de Raízes Orgânicas 2kg',
    description: 'Seleção de mandioca, batata-doce e cará direto do produtor.',
    category: 'Raízes e Tubérculos',
    image: 'https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?q=80&w=400&auto=format&fit=crop',
    retailPrice: 18.90,
    wholesalePrice: 12.00,
    stock: 100,
    unit: 'Saco'
  },
  {
    id: '3',
    name: 'Azeite de Oliva Extra Virgem 500ml',
    description: 'Prensado a frio, acidez máxima 0.2%. Sabor intenso.',
    category: 'Óleos e Essências',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400&auto=format&fit=crop',
    retailPrice: 38.00,
    wholesalePrice: 28.00,
    stock: 45,
    unit: 'Frasco'
  },
  {
    id: '4',
    name: 'Feijão Preto Premium 1kg',
    description: 'Grãos selecionados de agricultura familiar.',
    category: 'Grãos e Cereais',
    image: 'https://images.unsplash.com/photo-1551462147-37885abb3e4a?q=80&w=400&auto=format&fit=crop',
    retailPrice: 12.50,
    wholesalePrice: 8.90,
    stock: 200,
    unit: 'Pacote'
  },
  {
    id: '5',
    name: 'Cúrcuma Pura em Pó 100g',
    description: 'Raiz moída pura, sem conservantes ou corantes.',
    category: 'Temperos Naturais',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f3900f7?q=80&w=400&auto=format&fit=crop',
    retailPrice: 15.00,
    wholesalePrice: 9.50,
    stock: 80,
    unit: 'Pote'
  },
  {
    id: '6',
    name: 'Canudo de Bambu Reutilizável',
    description: 'Kit com 10 unidades. 100% biodegradável.',
    category: 'Utensílios Eco',
    image: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=400&auto=format&fit=crop',
    retailPrice: 25.00,
    wholesalePrice: 15.00,
    stock: 150,
    unit: 'Kit'
  }
];
