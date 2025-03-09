---
Title: Simulazione dei Numeri del Lotto
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/numeri-lotto-java.jpg"
Description: "Utilizzare i Thread in Java: Simulazione dei Numeri del Lotto"
Draft: 
---

# 🚀 Utilizzare i Thread in Java: Simulazione dei Numeri del Lotto

In Java, i Thread permettono di eseguire più operazioni contemporaneamente (concurrency), migliorando le prestazioni delle applicazioni. In questo post vedremo come creare e gestire i Thread con un esempio pratico: la simulazione dell'estrazione dei numeri del lotto. 🎱

# 📌 Cos'è un Thread?

Un Thread rappresenta un flusso di esecuzione indipendente in un programma. Java offre due modi principali per creare un Thread:

Estendere la classe Thread

Implementare l'interfaccia Runnable

## 📊 Esempio: Simulazione dei Numeri del Lotto

Vediamo un esempio pratico in cui ogni Thread simula l'estrazione di un numero casuale tra 1 e 90.

🔍 Codice Completo


```
import java.util.Random;

// Classe che estende Thread per simulare un'estrazione
class LottoThread extends Thread {
    private String nomeRuota;

    public LottoThread(String nomeRuota) {
        this.nomeRuota = nomeRuota;
    }

    @Override
    public void run() {
        Random random = new Random();
        System.out.println("Estrazione per la ruota di " + nomeRuota);

        for (int i = 0; i < 5; i++) {
            int numeroEstratto = random.nextInt(90) + 1;
            System.out.println(nomeRuota + " - Numero estratto: " + numeroEstratto);

            try {
                // Simula il tempo di attesa tra un'estrazione e l'altra
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                System.err.println("Thread interrotto: " + e.getMessage());
            }
        }

        System.out.println("Estrazione completata per la ruota di " + nomeRuota);
    }
}

public class LottoSimulation {
    public static void main(String[] args) {
        // Creazione di tre thread per diverse ruote
        LottoThread milano = new LottoThread("Milano");
        LottoThread roma = new LottoThread("Roma");
        LottoThread napoli = new LottoThread("Napoli");

        // Avvio dei thread
        milano.start();
        roma.start();
        napoli.start();
    }
}

```


## 📚 Spiegazione del Codice

LottoThread estende la classe Thread.

Il metodo run() genera 5 numeri casuali tra 1 e 90 per ogni ruota.

Usiamo Thread.sleep(1000) per simulare una pausa di 1 secondo tra le estrazioni.

Nel main() creiamo e avviamo tre thread per le ruote di Milano, Roma e Napoli.

## 📊 Output Previsto

L'output potrebbe variare ad ogni esecuzione, ad esempio:


```
Estrazione per la ruota di Milano
Estrazione per la ruota di Roma
Estrazione per la ruota di Napoli
Milano - Numero estratto: 45
Roma - Numero estratto: 12
Napoli - Numero estratto: 88
....
Estrazione completata per la ruota di Milano
Estrazione completata per la ruota di Roma
Estrazione completata per la ruota di Napoli

```


# 🧰 Perché Usare i Thread?

Parallelismo: eseguire più compiti contemporaneamente.

Efficienza: ridurre i tempi di attesa in operazioni lunghe (es. lettura da file o reti).
