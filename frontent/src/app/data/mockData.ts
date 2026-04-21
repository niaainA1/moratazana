export interface PaintProduct {
  id: string;
  name: string;
  imageUrl: string;
  currentStock: number;
  price: number;
  minStock: number;
  soldToday?: number;
  newArrival?: number;
}

export const paintProducts: PaintProduct[] = [
  {
    id: "1",
    name: "Peinture Acrylique Blanc 20L",
    imageUrl: "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBhaW50JTIwY2FuJTIwYnVja2V0fGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 45,
    price: 85000,
    minStock: 15,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "2",
    name: "Peinture Acrylique Bleu 20L",
    imageUrl: "https://images.unsplash.com/photo-1597585079079-e0bc92fdcfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcGFpbnQlMjBjYW4lMjBhY3J5bGljfGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 28,
    price: 87000,
    minStock: 15,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "3",
    name: "Peinture Murale Rouge 15L",
    imageUrl: "https://images.unsplash.com/photo-1760228752136-53e54f12a45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwYWludCUyMGJ1Y2tldCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 12,
    price: 65000,
    minStock: 10,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "4",
    name: "Peinture Extérieure Vert 25L",
    imageUrl: "https://images.unsplash.com/photo-1664137944571-0015896203c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHBhaW50JTIwY2FuJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzczMzc5MTYzfDA&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 8,
    price: 95000,
    minStock: 10,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "5",
    name: "Peinture Satinée Jaune 10L",
    imageUrl: "https://images.unsplash.com/photo-1731044492717-aefeb9150af6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZWxsb3clMjBwYWludCUyMGJ1Y2tldCUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3NzMzNzkxNjN8MA&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 22,
    price: 45000,
    minStock: 12,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "6",
    name: "Peinture Mate Gris 20L",
    imageUrl: "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHBhaW50JTIwY2FuJTIwYnVja2V0fGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 18,
    price: 82000,
    minStock: 15,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "7",
    name: "Peinture Brillante Noir 15L",
    imageUrl: "https://images.unsplash.com/photo-1597585079079-e0bc92fdcfa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcGFpbnQlMjBjYW4lMjBhY3J5bGljfGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 5,
    price: 72000,
    minStock: 8,
    soldToday: 0,
    newArrival: 0,
  },
  {
    id: "8",
    name: "Peinture Acrylique Beige 20L",
    imageUrl: "https://images.unsplash.com/photo-1760228752136-53e54f12a45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwYWludCUyMGJ1Y2tldCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzM3OTE2Mnww&ixlib=rb-4.1.0&q=80&w=400",
    currentStock: 0,
    price: 85000,
    minStock: 15,
    soldToday: 0,
    newArrival: 0,
  },
];

export const getStockStatus = (product: PaintProduct): "Disponible" | "Stock faible" | "Rupture" => {
  if (product.currentStock === 0) return "Rupture";
  if (product.currentStock <= product.minStock) return "Stock faible";
  return "Disponible";
};

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()} Ar`;
};
