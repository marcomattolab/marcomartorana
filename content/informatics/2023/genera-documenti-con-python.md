---
Title: Automatizziamo la generazione dei documenti del PCTO
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/collections3.jpg"
Description: "Generare automaticamente documenti word per N alunni su un progetto PCTO"
Draft: 
---

🎯 Generare automaticamente documenti word su un progetto PCTO con python

L'obiettivo principale è sviluppare un script in Python che è possibile eseguirs tramite Google Colab
per documentare il progetto PCTO su un sistema di spettacoli coreografici con droni in sciame e con riconoscimento facciale real-time
per ciscuno studente della classe composta da circa una ventina di alunni ma in modo automatizzato.

📊 Dettagli del Progetto

Classe: 4B Informatica e Telecomunicazioni
Periodo: Settembre 2024 - Giugno 2025
Tutor: Prof. MMA
Coordinatore: Prof. MMA
Prerequisiti: Caricare su Colab sotto la cartella 'content' un documento word denominato "SchedaValutazionePCTO-DR.11-PR.-7.5.1.docx" che contiene i segnaposti che devono essere valorizzari.
Il documento word deve essere compilato con i seguenti SEGNAPOSTO (ogni segnaposto ha una coppia di parentesi graffe).

Esempio:
      {data_compilazione} -> 01/06/2025
      {tutor} -> Prof. MMA
      {coordinatore} -> Prof. MMA
      {denominazione-corso} -> 4B Informatica e telecomunicazioni Progetto Drone
      {nome} -> Name
      {cognome} -> Surname
      {corso} -> Informatica
      {azienda} -> -
      {inizio} -> Settembre 2024
      {fine} -> Giugno 2025
      {progetto} -> Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale


Ecco il contenuto dello file JSON che conterrà l'elenco degli alunni:
👨‍🎓 Json 
```
array_dati =[
   {
      "data_compilazione":"01/06/2025",
      "tutor":"Prof. MMA",
      "coordinatore":"Prof. MMA",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Nome1",
      "cognome":"Cognome1",
      "corso":"Informatica",
      "azienda":"-",
      "inizio":"Settembre 2024",
      "fine":"Giugno 2025",
      "progetto":"Droni: Spettacoli coreografici in sciame e sistema di riconoscimento facciale in real-time"
   },
   {
      "data_compilazione":"02/06/2025",
      "tutor":"Prof. MMA",
      "coordinatore":"Prof. MMA",
      "denominazione-corso":" 4B Informatica e telecomunicazioni Progetto Drone",
      "nome":"Nome2",
      "cognome":"Cognome2",
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



💡 Ecco fatto: 
Eseguendo lo script verrà generato un documento word per ciascuno studente e 
verranno sostituiti i segnaposti con gli opportuni valori del file JSON.

Stay Tuned!