# Quniverse

An AI-powered, interactive learning roadmap that makes quantum science approachable — starting with shared foundations, then branching into specializations like quantum computing and cryptography.

**Live demo:** [quniverse.vercel.app](https://quniverse.vercel.app)

## The Problem

Quantum science is exciting but hard to break into as a beginner. Concepts like superposition and entanglement are usually thrown at learners abstractly, with no clear starting point. Quniverse fixes that by giving quantum education a structured path instead of a wall of theory.

## How It Works

1. Start with **Foundations** — 10 interactive modules covering superposition, entanglement, uncertainty, tunneling, and more.
2. Branch into a specialization:
   - **Computing & Information Science** 
   - **Communication & Security**
   - **Sensing, Metrology & Imaging** 
   - **Advanced Theory** 

## Features

- Real interactive simulations — a draggable 3D Bloch sphere, a live double-slit experiment, a working quantum key exchange
- AI tutor on every module — adjustable explanation depth, live chat, auto-generated quizzes
- Visual roadmap with progress tracking across 16+ topics

## Tech Stack

JavaScript, HTML/CSS, Three.js, Vercel, OpenAI API

## Setup

1. Get an API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add it as `OPENAI_API_KEY` under Vercel → Settings → Environment Variables
3. Deploy — `/api/claude.js` securely handles all AI requests

---

Built as a final project for Microsoft Coding & AI Worldwide projects. 
