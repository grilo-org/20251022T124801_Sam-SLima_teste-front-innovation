"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuth";
import api from "@/lib/api";
import useSWR from "swr";

import {
  Favorite,
  FavoriteBorderOutlined,
  Email,
  Phone,
  Notifications,
} from "@mui/icons-material";
import Head from "next/head";

type Produto = {
  codigo: string;
  nome: string;
  referencia: string;
  imagem: string;
  preco: string;
  descricao: string;
};

// fetcher para o SWR
const fetcher = (url: string) => api.get(url).then((res) => res.data);

const ProductsPage = () => {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [favoritar, setFavoritar] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favoritos") || "[]");
    }
    return [];
  });
  const [exibirFavoritos, setExibirFavoritos] = useState(false);

  const {
    data: produtos,
    error,
    isLoading,
    mutate,
  } = useSWR<Produto[]>("/innova-dinamica/produtos/listar", fetcher);

  const produtosFiltrados = exibirFavoritos
    ? produtos?.filter((p) => favoritar.includes(p.codigo)) || []
    : produtos || [];

  const toggleFavoritar = (codigo: string) => {
    let novosFavoritos;
    if (favoritar.includes(codigo)) {
      novosFavoritos = favoritar.filter((c) => c !== codigo);
    } else {
      novosFavoritos = [...favoritar, codigo];
    }
    setFavoritar(novosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(novosFavoritos));
  };

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProdutoSelecionado(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (produtoSelecionado) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [produtoSelecionado]);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Produtos - Innovation Brindes</title>
        <meta
          name="description"
          content="Confira nossos produtos disponíveis"
        />
      </Head>

      <header className="bg-lime-600 text-white px-8 py-3 flex justify-between items-center shadow">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-wide">
            Innovation Brindes
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Email fontSize="small" />
          <Phone fontSize="small" />
          <Notifications fontSize="small" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="font-semibold">Samuel Lima</span>
              <span className="text-sm opacity-80">Quarta, 23/09/2020</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        {produtoSelecionado && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-600/40 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            onClick={() => setProdutoSelecionado(null)}
          >
            <div
              className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="modal-title" className="text-xl font-bold mb-4">
                {produtoSelecionado.nome}
              </h2>
              <img
                src={produtoSelecionado.imagem}
                alt={produtoSelecionado.nome}
                className="w-full h-80 object-cover rounded mb-4"
              />
              <p id="modal-desc" className="mb-2">
                <strong>Código:</strong> {produtoSelecionado.codigo}
              </p>
              <p className="mb-2">
                <strong>Referência:</strong> {produtoSelecionado.referencia}
              </p>
              <p className="mb-2">
                <strong>Preço:</strong>{" "}
                {Number(produtoSelecionado.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="mb-4">{produtoSelecionado.descricao}</p>
              <button
                onClick={() => setProdutoSelecionado(null)}
                className="mt-2 bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        <label className="mb-6 inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={exibirFavoritos}
            onChange={(e) => setExibirFavoritos(e.target.checked)}
          />
          Mostrar apenas favoritos
        </label>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className=" p-4 rounded shadow animate-pulse">
                <div className="bg-gray-300 w-full h-40 mb-2"></div>
                <div className="h-4 bg-gray-300 mb-1"></div>
                <div className="h-4 bg-gray-300 w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="my-4">
            <p className="text-red-500">Erro ao carregar produtos</p>
            <button
              onClick={() => mutate()}
              className="mt-2 bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {!isLoading &&
            produtosFiltrados.map((produto) => (
              <div
                key={produto.codigo}
                className="border border-gray-200 rounded-xl bg-white flex flex-col shadow hover:shadow-md transition relative"
              >
                <button
                  onClick={() => toggleFavoritar(produto.codigo)}
                  aria-label={
                    favoritar.includes(produto.codigo)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                  className="absolute top-2 right-2"
                >
                  {favoritar.includes(produto.codigo) ? (
                    <Favorite className="text-lime-600" />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </button>

                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-60 object-contain p-2"
                />

                <div className="px-3 pb-3 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm mt-2">{produto.nome}</h3>
                  <p className="text-xs text-gray-500">Ref: {produto.codigo}</p>
                  <p className="text-lime-600 font-bold mt-1">
                    {Number(produto.preco).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <button
                    onClick={() => setProdutoSelecionado(produto)}
                    className="mt-auto bg-lime-600 text-white font-bold text-sm py-2 rounded hover:bg-lime-700 transition"
                  >
                    CONFIRA
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
