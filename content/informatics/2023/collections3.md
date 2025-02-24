---
Title: Progetto Drone Show
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/collections3.jpg"
Description: "Progetto Droni - Spettacoli Coreografici e Riconoscimento Facciale in Real-Time"
Draft: 
---

Progetto PCTO: "Droni - Spettacoli Coreografici e Riconoscimento Facciale in Real-Time"

Siamo entusiasti di condividere il nostro nuovo progetto PCTO (Percorsi per le Competenze Trasversali e l'Orientamento), realizzato dalla classe 4B Informatica e Telecomunicazioni! Questo ambizioso progetto unisce tecnologia, creatività e innovazione, portando la nostra scuola all'avanguardia nella sperimentazione di sistemi avanzati.

🎯 Obiettivo del Progetto

L'obiettivo principale è sviluppare un sistema di spettacoli coreografici con droni in sciame e implementare un avanzato sistema di riconoscimento facciale in tempo reale. Gli studenti, guidati da tutor esperti, hanno avuto l'opportunità di applicare le loro conoscenze teoriche a casi d'uso reali, migliorando le loro competenze tecniche e trasversali.

📊 Dettagli del Progetto

Classe: 4B Informatica e Telecomunicazioni
Periodo: Settembre 2024 - Giugno 2025
Tutor: Prof. Martorana
Coordinatore: Prof.ssa JFK

👨‍🎓 Json 
```
array_dati =[
   {
      "data_compilazione":"01/06/2025",
      "tutor":"Prof. MMA",
      "coordinatore":"Prof.ssa JFK",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Name",
      "cognome":"Surname",
      "corso":"Informatica",
      "azienda":"-",
      "inizio":"Settembre 2024",
      "fine":"Giugno 2025",
      "progetto":"Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale in real-time"
   },
   {
      "data_compilazione":"02/06/2025",
      "tutor":"Prof. MMA",
      "coordinatore":"Prof.ssa JFK",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Nome",
      "cognome":"Cognome",
      "corso":"Informatica",
      "azienda":"-",
      "inizio":"Settembre 2024",
      "fine":"Giugno 2025",
      "progetto":"Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale in real-time"
   }]
```

💡 Codice Python



```
!pip install python-docx
from docx import Document

def compila_template(template_path, output_path, dati):
    """
    Legge un template Word e lo compila con i dati forniti.
    """
    # Apri il documento
    doc = Document(template_path)

    # Sostituisci i segnaposto con i dati forniti
    for paragrafo in doc.paragraphs:
        for chiave, valore in dati.items():
            if f"{{{{{chiave}}}}}" in paragrafo.text:  # Segnaposto formato {{chiave}}
                paragrafo.text = paragrafo.text.replace(f"{{{{{chiave}}}}}", valore)

    # Salva il documento compilato
    doc.save(output_path)

# Esempio di utilizzo
def main():
    template_path = "/content/SchedaValutazionePCTO-DR.11-PR.-7.5.1.docx"  # Percorso del template Word
    output_path = "SchedaValutazionePCTO-DR.11-PR.-7.5.1.docx"  # Percorso del file compilato

    # Array di dati da inserire nel documento
    array_dati = [
   {
      "data_compilazione":"01/06/2025",
      "tutor":"Prof. Marco Martorana",
      "coordinatore":"Prof.ssa jfk",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Samuel",
      "cognome":"Jhons",
      "corso":"Informatica",
      "azienda":"-",
      "inizio":"Settembre 2024",
      "fine":"Giugno 2025",
      "progetto":"Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale in real-time"
   },
   {
      "data_compilazione":"01/06/2025",
      "tutor":"Prof. Marco Martorana",
      "coordinatore":"Prof.ssa JFK",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Jeff",
      "cognome":"Zend",
      "corso":"Informatica",
      "azienda":"-",
      "inizio":"Settembre 2024",
      "fine":"Giugno 2025",
      "progetto":"Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale in real-time"
   }
]

    for i, dati in enumerate(array_dati):
        output_file = output_path.replace(".docx", f"_{i+1}.docx")
        compila_template(template_path, output_file, dati)
        print(f"Documento compilato salvato in: {output_file}")

if __name__ == "__main__":
    main()

```