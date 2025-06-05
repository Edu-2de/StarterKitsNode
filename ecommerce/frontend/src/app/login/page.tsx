"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register } from "@/api/auth"; // importa os fetchs

type AnimState =
  | null
  | "kick-email"
  | "kick-senha"
  | "kick-nome"
  | "kick-confirm"
  | "kick-finish"
  | "kick-in";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState<"email" | "senha" | "nome" | "confirm" | null>(null);

  // Registro
  const [isRegister, setIsRegister] = useState(false);
  const [nome, setNome] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [registerMsg, setRegisterMsg] = useState<string | null>(null);

  // Animação de "chutão"
  const [animState, setAnimState] = useState<AnimState>(null);

  // Controla exibição dos campos individualmente
  const [loginFields, setLoginFields] = useState(["email", "senha"]);
  const [registerFields, setRegisterFields] = useState(["nome", "email", "senha", "confirm"]);

  // Hover/click da logo
  const logoWord = "Logo".split("");
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(0);

  // Salva a letra clicada no localStorage
  useEffect(() => {
    const saved = localStorage.getItem("logo-highlight");
    if (saved !== null) setHoveredLetter(Number(saved));
    else setHoveredLetter(0);
  }, []);
  function handleLogoClick(idx: number) {
    setHoveredLetter(idx);
    localStorage.setItem("logo-highlight", String(idx));
  }

  // Controla exibição dos blocos
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  // LOGIN
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (email && senha) {
      try {
        const data = await login(email, senha);
        localStorage.setItem("token", data.token);
        setMsg("🎉 Login realizado com sucesso!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setMsg(err.message || "Erro ao fazer login");
      }
    } else {
      setMsg("Preencha todos os campos.");
    }
  }

  // REGISTRO
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegisterMsg(null);
    if (nome && email && senha && confirmSenha) {
      if (senha !== confirmSenha) {
        setRegisterMsg("As senhas não coincidem.");
        return;
      }
      try {
        const data = await register(nome, email, senha);
        localStorage.setItem("token", data.token);
        setRegisterMsg("🎉 Cadastro realizado com sucesso!");
        setTimeout(() => {
          // Limpa campos de registro
          setNome("");
          setEmail("");
          setSenha("");
          setConfirmSenha("");
          // Troca para tela de login animada
          kickSwitchForm();
        }, 1300);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setRegisterMsg(err.message || "Erro ao cadastrar");
      }
    } else {
      setRegisterMsg("Preencha todos os campos.");
    }
  }

  // Animação de saída dos campos um por um e entrada dos outros um por um
  function kickSwitchForm() {
    setMsg(null);
    setRegisterMsg(null);

    if (!isRegister) {
      setAnimState("kick-email");
      setTimeout(() => setLoginFields(fields => fields.filter(f => f !== "email")), 250);
      setTimeout(() => setAnimState("kick-senha"), 320);
      setTimeout(() => setLoginFields(fields => fields.filter(f => f !== "senha")), 570);
      setTimeout(() => setAnimState("kick-finish"), 600);
      setTimeout(() => {
        setShowLogin(false);
        setShowRegister(true);
        setIsRegister(true);
        setRegisterFields([]);
        setTimeout(() => {
          setRegisterFields(["nome"]);
          setAnimState("kick-in");
          setTimeout(() => setRegisterFields(["nome", "email"]), 90);
          setTimeout(() => setRegisterFields(["nome", "email", "senha"]), 180);
          setTimeout(() => setRegisterFields(["nome", "email", "senha", "confirm"]), 270);
          setTimeout(() => setAnimState(null), 500);
        }, 80);
      }, 700);
    } else {
      setAnimState("kick-nome");
      setTimeout(() => setRegisterFields(fields => fields.filter(f => f !== "nome")), 250);
      setTimeout(() => setAnimState("kick-email"), 320);
      setTimeout(() => setRegisterFields(fields => fields.filter(f => f !== "email")), 570);
      setTimeout(() => setAnimState("kick-senha"), 640);
      setTimeout(() => setRegisterFields(fields => fields.filter(f => f !== "senha")), 890);
      setTimeout(() => setAnimState("kick-confirm"), 960);
      setTimeout(() => setRegisterFields(fields => fields.filter(f => f !== "confirm")), 1210);
      setTimeout(() => setAnimState("kick-finish"), 1250);
      setTimeout(() => {
        setShowRegister(false);
        setShowLogin(true);
        setIsRegister(false);
        setLoginFields([]);
        setTimeout(() => {
          setLoginFields(["email"]);
          setAnimState("kick-in");
          setTimeout(() => setLoginFields(["email", "senha"]), 90);
          setTimeout(() => setAnimState(null), 500);
        }, 80);
      }, 1350);
    }
  }

  function getKickClass(field: string) {
    if (animState === `kick-${field}`) return "animate-chutao-out";
    if (animState === "kick-finish") return "opacity-0 pointer-events-none";
    if (animState === "kick-in") return "animate-chutao-in";
    return "";
  }

  return (
    <main
      className={`
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200
        px-4 relative overflow-hidden transition-colors
      `}
    >
      {/* Botão voltar para Home */}
      <Link
        href="/"
        className={`
          fixed left-4 top-4 sm:left-8 sm:top-8 w-10 h-10 flex items-center justify-center
          rounded-full bg-white/90 shadow border border-neutral-200 z-20
          hover:bg-neutral-200 transition group
        `}
        tabIndex={0}
        aria-label="Voltar para Home"
      >
        <span className="text-2xl text-neutral-700 group-hover:text-neutral-900 transition select-none font-bold">×</span>
      </Link>

      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-neutral-200/40 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-neutral-300/40 rounded-full filter blur-3xl animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-neutral-100/40 rounded-full filter blur-2xl animate-spin-slow z-0" />

      <div className={`
        w-full max-w-md
        bg-white/90
        rounded-2xl shadow-2xl p-8 flex flex-col gap-6 relative z-10
        animate-fade-in-down overflow-hidden min-h-[420px]
        border border-neutral-200
      `}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-5xl sm:text-6xl font-extrabold text-neutral-700 select-none drop-shadow-lg mb-1">
            {logoWord.map((letra, idx) => (
              <span
                key={idx}
                className="cursor-pointer px-1 animate-logo-letter"
                onMouseEnter={() => setHoveredLetter(idx)}
                onMouseLeave={() =>
                  setHoveredLetter(
                    localStorage.getItem("logo-highlight") !== null
                      ? Number(localStorage.getItem("logo-highlight"))
                      : 0
                  )
                }
                onClick={() => handleLogoClick(idx)}
                style={{
                  userSelect: "none",
                  animation:
                    hoveredLetter === idx
                      ? "logo-bounce 0.4s cubic-bezier(.5,1.7,.5,1) both"
                      : undefined,
                }}
              >
                {letra}
              </span>
            ))}
          </span>
          <span className="text-lg text-neutral-500 font-medium animate-fade-in">
            {isRegister ? "Crie sua conta" : "Entre na sua conta"}
          </span>
        </div>
        {/* Login */}
        {showLogin && (
          <form className="flex flex-col gap-4 transition-all duration-700" onSubmit={handleLogin} autoComplete="off">
            {loginFields.includes("email") && (
              <label className={`flex flex-col gap-1 group transition-all duration-300 ${getKickClass("email")}`}>
                <span
                  className={`
                    font-semibold transition-colors
                    ${focusField === "email"
                      ? "text-neutral-400"
                      : "text-neutral-700"}
                  `}
                >
                  E-mail
                </span>
                <input
                  type="email"
                  required
                  className={`
                    px-4 py-3 rounded border
                    bg-white
                    text-base text-neutral-700
                    placeholder-neutral-400
                    focus:outline-none focus:ring-2 transition
                    border-neutral-200
                    focus:ring-neutral-300
                    shadow-sm group-hover:scale-105 duration-200
                    ${focusField === "email" ? "ring-2 ring-neutral-400" : ""}
                  `}
                  placeholder="seu@email.com"
                  value={email}
                  onFocus={() => setFocusField("email")}
                  onBlur={() => setFocusField(null)}
                  onChange={e => setEmail(e.target.value)}
                  disabled={!!animState}
                />
              </label>
            )}
            {loginFields.includes("senha") && (
              <label className={`flex flex-col gap-1 group relative transition-all duration-300 ${getKickClass("senha")}`}>
                <span
                  className={`
                    font-semibold transition-colors
                    ${focusField === "senha"
                      ? "text-neutral-400"
                      : "text-neutral-700"}
                  `}
                >
                  Senha
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className={`
                    px-4 py-3 rounded border
                    bg-white
                    text-base text-neutral-700
                    placeholder-neutral-400
                    focus:outline-none focus:ring-2 transition
                    border-neutral-200
                    focus:ring-neutral-300
                    shadow-sm group-hover:scale-105 duration-200
                    ${focusField === "senha" ? "ring-2 ring-neutral-400" : ""}
                  `}
                  placeholder="Sua senha"
                  value={senha}
                  onFocus={() => setFocusField("senha")}
                  onBlur={() => setFocusField(null)}
                  onChange={e => setSenha(e.target.value)}
                  disabled={!!animState}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-700 transition"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  disabled={!!animState}
                >
                  {showPassword ? (
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                  ) : (
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 3l18 18M10.7 10.7A3 3 0 0 0 12 15a3 3 0 0 0 2.3-4.3M6.6 6.6C4.7 8 3 12 3 12s3.6 7 9 7c1.6 0 3.1-.3 4.4-.9M17.4 17.4C19.3 16 21 12 21 12s-3.6-7-9-7c-1.2 0-2.4.2-3.4.6" stroke="currentColor" strokeWidth="1.5"/></svg>
                  )}
                </button>
              </label>
            )}
            {loginFields.length === 2 && (
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-full bg-neutral-700 text-white font-bold text-base hover:bg-neutral-800 transition shadow-lg hover:scale-105 active:scale-95 duration-150"
                disabled={!!animState}
              >
                Entrar
              </button>
            )}
            {msg && (
              <span className="text-neutral-700 text-sm font-semibold text-center mt-1 animate-pulse">
                {msg}
              </span>
            )}
            {loginFields.length === 2 && (
              <div className="text-center text-neutral-500 text-base mt-2 animate-fade-in">
                Não tem uma conta?{" "}
                <button
                  className="text-neutral-700 font-bold hover:underline hover:text-neutral-400 transition"
                  onClick={kickSwitchForm}
                  disabled={!!animState}
                >
                  Cadastre-se
                </button>
              </div>
            )}
          </form>
        )}
        {/* Registro */}
        {showRegister && (
          <form className="flex flex-col gap-4 transition-all duration-700" onSubmit={handleRegister} autoComplete="off">
            {registerFields.includes("nome") && (
              <label className={`flex flex-col gap-1 group transition-all duration-300 ${getKickClass("nome")}`}>
                <span
                  className={`
                    font-semibold transition-colors
                    ${focusField === "nome"
                      ? "text-neutral-400"
                      : "text-neutral-700"}
                  `}
                >
                  Nome
                </span>
                <input
                  type="text"
                  required
                  className={`
                    px-4 py-3 rounded border
                    bg-white
                    text-base text-neutral-700
                    placeholder-neutral-400
                    focus:outline-none focus:ring-2 transition
                    border-neutral-200
                    focus:ring-neutral-300
                    shadow-sm group-hover:scale-105 duration-200
                    ${focusField === "nome" ? "ring-2 ring-neutral-400" : ""}
                  `}
                  placeholder="Seu nome"
                  value={nome}
                  onFocus={() => setFocusField("nome")}
                  onBlur={() => setFocusField(null)}
                  onChange={e => setNome(e.target.value)}
                  disabled={!!animState}
                />
              </label>
            )}
            {registerFields.includes("email") && (
              <label className={`flex flex-col gap-1 group transition-all duration-300 ${getKickClass("email")}`}>
                <span
                  className={`
                    font-semibold transition-colors
                    ${focusField === "email"
                      ? "text-neutral-400"
                      : "text-neutral-700"}
                  `}
                >
                  E-mail
                </span>
                <input
                  type="email"
                  required
                  className={`
                    px-4 py-3 rounded border
                    bg-white
                    text-base text-neutral-700
                    placeholder-neutral-400
                    focus:outline-none focus:ring-2 transition
                    border-neutral-200
                    focus:ring-neutral-300
                    shadow-sm group-hover:scale-105 duration-200
                    ${focusField === "email" ? "ring-2 ring-neutral-400" : ""}
                  `}
                  placeholder="seu@email.com"
                  value={email}
                  onFocus={() => setFocusField("email")}
                  onBlur={() => setFocusField(null)}
                  onChange={e => setEmail(e.target.value)}
                  disabled={!!animState}
                />
              </label>
            )}
            {registerFields.includes("senha") && (
              <label className={`flex flex-col gap-1 group relative transition-all duration-300 ${getKickClass("senha")}`}>
                <span
                  className={`
                    font-semibold transition-colors
                    ${focusField === "senha"
                      ? "text-neutral-400"
                      : "text-neutral-700"}
                  `}
                >
                  Senha
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className={`
                    px-4 py-3 rounded border
                    bg-white
                    text-base text-neutral-700
                    placeholder-neutral-400
                    focus:outline-none focus:ring-2 transition
                    border-neutral-200
                    focus:ring-neutral-300
                    shadow-sm group-hover:scale-105 duration-200
                    ${focusField === "senha" ? "ring-2 ring-neutral-400" : ""}
                  `}
                  placeholder="Crie uma senha"
                  value={senha}
                  onFocus={() => setFocusField("senha")}
                  onBlur={() => setFocusField(null)}
                  onChange={e => setSenha(e.target.value)}
                  disabled={!!animState}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-700 transition"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  disabled={!!animState}
                >
                  {showPassword ? (
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                  ) : (
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 3l18 18M10.7 10.7A3 3 0 0 0 12 15a3 3 0 0 0 2.3-4.3M6.6 6.6C4.7 8 3 12 3 12s3.6 7 9 7c1.6 0 3.1-.3 4.4-.9M17.4 17.4C19.3 16 21 12 21 12s-3.6-7-9-7c-1.2 0-2.4.2-3.4.6" stroke="currentColor" strokeWidth="1.5"/></svg>
                  )}
                </button>
              </label>
            )}
            {registerFields.includes("confirm") && (
              <label className={`flex flex-col gap-1 group transition-all duration-300 ${getKickClass("confirm")}`}>
                <span className="font-semibold text-neutral-700">Confirmar senha</span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="px-4 py-3 rounded border bg-white text-base text-neutral-700 placeholder-neutral-400 focus:outline-none focus:ring-2 border-neutral-200 focus:ring-neutral-300 shadow-sm group-hover:scale-105 duration-200"
                  placeholder="Repita a senha"
                  value={confirmSenha}
                  onChange={e => setConfirmSenha(e.target.value)}
                  disabled={!!animState}
                />
              </label>
            )}
            {registerFields.length === 4 && (
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-full bg-neutral-700 text-white font-bold text-base hover:bg-neutral-800 transition shadow-lg hover:scale-105 active:scale-95 duration-150"
                disabled={!!animState}
              >
                Cadastrar
              </button>
            )}
            {registerMsg && (
              <span className="text-neutral-700 text-sm font-semibold text-center mt-1 animate-pulse">
                {registerMsg}
              </span>
            )}
            {registerFields.length === 4 && (
              <div className="text-center text-neutral-500 text-base mt-2 animate-fade-in">
                Já tem uma conta?{" "}
                <button
                  className="text-neutral-700 font-bold hover:underline hover:text-neutral-400 transition"
                  onClick={kickSwitchForm}
                  disabled={!!animState}
                >
                  Entrar
                </button>
              </div>
            )}
          </form>
        )}
      </div>
      {/* Tailwind Animations */}
      <style jsx global>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-32px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.7s cubic-bezier(.4,2,.6,.9) both;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        @keyframes fade-in {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease both;
        }
        @keyframes chutao-out {
          0% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1);}
          60% { opacity: 1; transform: translateX(40px) rotate(12deg) scale(1.08);}
          100% { opacity: 0; transform: translateX(120vw) rotate(40deg) scale(0.9);}
        }
        .animate-chutao-out {
          animation: chutao-out 0.25s cubic-bezier(.7,0,.3,1) both;
        }
        @keyframes chutao-in {
          0% { opacity: 0; transform: translateX(-120vw) rotate(-40deg) scale(0.9);}
          60% { opacity: 1; transform: translateX(-40px) rotate(-12deg) scale(1.08);}
          100% { opacity: 1; transform: translateX(0) rotate(0deg) scale(1);}
        }
        .animate-chutao-in {
          animation: chutao-in 0.5s cubic-bezier(.7,0,.3,1) both;
        }
        @keyframes logo-fade {
          0% { letter-spacing: 0.2em; opacity: 0.7;}
          100% { letter-spacing: 0em; opacity: 1;}
        }
        .animate-logo-fade {
          animation: logo-fade 1.2s cubic-bezier(.4,2,.6,.9) both;
        }
        .animate-logo-letter {
          transition: color 0.2s;
        }
        @keyframes logo-bounce {
          0% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-18%);
          }
          50% {
            transform: translateY(-28%);
          }
          70% {
            transform: translateY(-18%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}