"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuth";
import React from "react";
import { useRouter } from "next/navigation";

// Ícones do MUI
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Head from "next/head";

const LoginPage = () => {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterLogado, setManterLogado] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await api.post("/innova-dinamica/login/acessar", {
        email,
        senha,
      });

      if (res.data.status === 1) {
        setToken(
          res.data.token_de_acesso,
          res.data.dados_usuario,
          manterLogado
        );
        router.push("/produtos");
      } else {
        setErro(res.data.message || "falha no login");
      }
    } catch (err: unknown) {
      const e = err as {
        response?: { data?: { message?: string } };
        request?: unknown;
      };
      if (e.response) {
        setErro(e.response.data?.message || "Erro retornado pela API");
      } else if (e.request) {
        setErro("A API não respondeu. Tente novamente mais tarde.");
      } else {
        setErro("Erro desconhecido. Tente novamente");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <Head>
        <title>Login - Innovation Brindes</title>
        <meta
          name="description"
          content="Acesse sua conta no Innovation Brindes"
        />
      </Head>
      <h1 className="text-2xl text-green-600 font-bold mb-6">
        Bem-vindo a Innovation Brindes
      </h1>

      <form
        onSubmit={handleLogin}
        className="bg-lime-600 p-10 flex flex-col items-center rounded-2xl shadow-lg w-[26rem] space-y-6"
      >
        {erro && <p className="text-red-500 text-sm font-medium">{erro}</p>}

        <div className="flex items-center bg-white rounded-full px-4 py-3 w-full shadow-sm">
          <PersonIcon className="text-gray-500 mr-2" fontSize="small" />
          <input
            type="text"
            placeholder="Usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        <div className="flex items-center bg-white rounded-full px-4 py-3 w-full shadow-sm">
          <LockIcon className="text-gray-500 mr-2" fontSize="small" />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        <div className="flex justify-between items-center text-sm text-white w-full px-2">
          <label className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={manterLogado}
              onChange={(e) => setManterLogado(e.target.checked)}
              className="accent-white"
            />
            <span>Manter logado</span>
          </label>
          <a href="#" className="hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <button
          className="bg-white text-lime-600 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition w-[10rem]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
