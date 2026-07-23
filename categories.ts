import {
  ShoppingCart,
  Utensils,
  Phone,
  Clapperboard,
  BookOpen,
  Sparkles,
  Dumbbell,
  Users,
  Bus,
  Shirt,
  Car,
  Wine,
  Headphones,
  Plane,
  Pill,
  PawPrint,
  Wrench,
  Home,
  Sofa,
  Gift,
  Heart,
  Cookie,
  Baby,
  ShoppingBasket,
  Syringe,
  Tv,
  ClipboardList,
  Church,
  Tag,
  CreditCard,
  Cog,
  Activity,
  Building2,
  TriangleAlert,
  GraduationCap,
  Smartphone,
  Landmark,
  HeartPulse,
  Boxes,
  Banknote,
  QrCode,
  Wallet,
  UtensilsCrossed,
  Sandwich,
  Barcode,
  ArrowLeftRight,
  Coins,
  Briefcase,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

export type Categoria = {
  id: string
  nome: string
  icone: LucideIcon
}

// Categorias de despesa (mesma ordem das referências)
export const CATEGORIAS_DESPESA: Categoria[] = [
  { id: "compras", nome: "Compras", icone: ShoppingCart },
  { id: "comida", nome: "Comida", icone: Utensils },
  { id: "telefone", nome: "Telefone", icone: Phone },
  { id: "entretenimento", nome: "Entretenimento", icone: Clapperboard },
  { id: "educacao", nome: "Educação", icone: BookOpen },
  { id: "beleza", nome: "Beleza", icone: Sparkles },
  { id: "esporte", nome: "Esporte", icone: Dumbbell },
  { id: "social", nome: "Social", icone: Users },
  { id: "transporte", nome: "Transporte", icone: Bus },
  { id: "roupas", nome: "Roupas e acessórios", icone: Shirt },
  { id: "carro", nome: "Carro", icone: Car },
  { id: "bebidas", nome: "Bebidas", icone: Wine },
  { id: "eletronicos", nome: "Eletrônicos", icone: Headphones },
  { id: "viagem", nome: "Viagem", icone: Plane },
  { id: "saude", nome: "Saúde", icone: Pill },
  { id: "pet", nome: "Pet", icone: PawPrint },
  { id: "reparos", nome: "Reparos", icone: Wrench },
  { id: "habitacao", nome: "Habitação", icone: Home },
  { id: "moveis", nome: "Móveis", icone: Sofa },
  { id: "presente", nome: "Presente", icone: Gift },
  { id: "doacao", nome: "Doação", icone: Heart },
  { id: "lanche", nome: "Lanche", icone: Cookie },
  { id: "bebe", nome: "Bebê", icone: Baby },
  { id: "mercado", nome: "Mercado", icone: ShoppingBasket },
  { id: "farmacia", nome: "Farmácia", icone: Syringe },
  { id: "assinaturas", nome: "Assinaturas", icone: Tv },
  { id: "impostos", nome: "Impostos", icone: ClipboardList },
  { id: "dizimo", nome: "Dízimo", icone: Church },
  { id: "ofertas", nome: "Ofertas", icone: Tag },
  { id: "cartao-credito", nome: "Cartão de Crédito", icone: CreditCard },
  { id: "manutencao", nome: "Manutenção veicular", icone: Cog },
  { id: "academia", nome: "Academia e suplementos", icone: Activity },
  { id: "aluguel", nome: "Aluguel", icone: Building2 },
  { id: "imprevistos", nome: "Imprevistos", icone: TriangleAlert },
  { id: "faculdade", nome: "Faculdade e cursos", icone: GraduationCap },
  { id: "recarga", nome: "Recarga de telefone", icone: Smartphone },
  { id: "iptu", nome: "IPTU", icone: Landmark },
  { id: "plano-saude", nome: "Plano de saúde", icone: HeartPulse },
  { id: "outros", nome: "Outros", icone: Boxes },
]

// Categorias de receita
export const CATEGORIAS_RECEITA: Categoria[] = [
  { id: "salario", nome: "Salário", icone: Briefcase },
  { id: "freelance", nome: "Freelance", icone: TrendingUp },
  { id: "investimentos", nome: "Investimentos", icone: Coins },
  { id: "presente-receita", nome: "Presente", icone: Gift },
  { id: "vendas", nome: "Vendas", icone: Tag },
  { id: "outros-receita", nome: "Outros", icone: Boxes },
]

export type MetodoPagamento = {
  id: string
  nome: string
  icone: LucideIcon
}

export const METODOS_PAGAMENTO: MetodoPagamento[] = [
  { id: "dinheiro", nome: "Dinheiro", icone: Banknote },
  { id: "pix", nome: "Pix", icone: QrCode },
  { id: "cartao-credito", nome: "Cartão de Crédito", icone: CreditCard },
  { id: "cartao-debito", nome: "Cartão de Débito", icone: Wallet },
  { id: "vale-alimentacao", nome: "Vale Alimentação", icone: UtensilsCrossed },
  { id: "vale-refeicao", nome: "Vale Refeição", icone: Sandwich },
  { id: "boleto", nome: "Boleto", icone: Barcode },
  { id: "transferencia", nome: "Transferência Bancária", icone: ArrowLeftRight },
  { id: "troco", nome: "Troco/Sobra", icone: Coins },
  { id: "outros", nome: "Outros", icone: Boxes },
]

const TODAS = [...CATEGORIAS_DESPESA, ...CATEGORIAS_RECEITA]

export function acharCategoria(id?: string): Categoria | undefined {
  if (!id) return undefined
  return TODAS.find((c) => c.id === id)
}
