import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react"; // Importação do plugin react
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignora a pasta 'dist' globalmente, essencial para builds
  globalIgnores(["dist"]),

  {
    // Aplica esta configuração a arquivos JavaScript e JSX
    files: ["**/*.{js,jsx}"],

    // Estende as configurações recomendadas de ESLint e React
    extends: [
      js.configs.recommended, // Regras básicas recomendadas do ESLint
      reactHooks.configs["recommended-latest"], // Regras para React Hooks
      reactRefresh.configs.vite, // Regras para React Refresh (com Vite)
      react.configs.recommended, // Regras gerais recomendadas para React
    ],

    // Define os plugins que serão usados neste escopo
    plugins: {
      react, // Habilita o plugin React para que suas regras sejam acessíveis
    },

    // Configurações de linguagem e parser
    languageOptions: {
      ecmaVersion: "latest", // Suporte à versão mais recente do ECMAScript
      globals: globals.browser, // Habilita variáveis globais do ambiente de navegador
      parserOptions: {
        ecmaVersion: "latest", // Garante que o parser entenda a sintaxe mais recente
        ecmaFeatures: { jsx: true }, // Habilita o suporte a JSX
        sourceType: "module", // Usa módulos ES (import/export)
      },
    },

    // Regras personalizadas ou sobrescritas
    rules: {
      // Configura 'no-unused-vars' para ignorar variáveis que começam com maiúscula ou underscore
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],

      // Desativa regras específicas do React para React 17+ (onde 'React' não precisa ser importado)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Outras regras úteis que você pode considerar adicionar ou modificar:
      // 'indent': ['error', 2], // Força identação de 2 espaços
      // 'linebreak-style': ['error', 'unix'], // Força quebras de linha estilo Unix
      // 'quotes': ['error', 'single'], // Força aspas simples
      // 'semi': ['error', 'always'], // Força ponto e vírgula no final das declarações
    },

    // Configurações específicas para plugins, como o React
    settings: {
      react: {
        version: "detect", // Detecta automaticamente a versão do React em uso
      },
    },
  },
]);
