import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware para manejar datos de formulario multipart/form-data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const data = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["janievesc@gmail.com"],
            subject: `Nuevo mensaje del Formulario Web de parte de: ${name}`,
            html: `<strong>Mensaje:</strong> ${message}<br><strong>Correo:</strong> ${email}`
        });

        res.status(200).json({ message: "Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo." });
    } catch (error) {
        res.status(400).json({ error: "Hubo un error al enviar tu mensaje. Inténtalo más tarde." });
    }
});

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});