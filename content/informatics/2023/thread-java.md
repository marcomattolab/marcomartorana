---
Title: Thread in Java
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/collections3.jpg"
Description: "Guida ai Thread in Java - Una guida essenziale per comprendere e utilizzare i thread in Java. Impara a creare, gestire e sincronizzare i thread."
Draft: 
---

# Guida ai Thread in Java

## 🧵 Cos'è un Thread?
Un thread è una singola unità di esecuzione di un programma che consente l'esecuzione di compiti in modo indipendente all'interno dello stesso processo. Ogni programma Java ha almeno un thread principale (chiamato main thread), che viene avviato automaticamente quando il programma parte. Questo thread esegue il metodo main() ed è responsabile dell'inizio dell'intero flusso di esecuzione.

L'uso dei thread in Java consente di implementare la programmazione concorrente, permettendo di eseguire più operazioni contemporaneamente all'interno di uno stesso processo. Questo risulta utile in molti scenari, come:

**Multitasking**: I thread consentono a un programma di eseguire più attività simultaneamente, ad esempio scaricare un file e aggiornare un'interfaccia utente allo stesso tempo.
**Miglioramento delle prestazioni**: In presenza di più core del processore, i thread possono essere eseguiti in parallelo, migliorando l'efficienza del programma.
**Esecuzione asincrona**: Utilizzando i thread, alcune operazioni che richiedono tempo (come l'accesso a risorse di rete o il calcolo complesso) possono essere eseguite in background senza bloccare il thread principale, mantenendo reattiva l'interfaccia utente.

# In Java, i thread possono essere creati in diversi modi, tra cui:

- Estensione della classe Thread: Creando una classe che estende Thread e sovrascrivendo il metodo run().
- Implementazione dell'interfaccia Runnable: Creando una classe che implementa Runnable e definendo il metodo run().


## 📝 Perché usare i Thread?

Migliorare le prestazioni: eseguire più operazioni in parallelo.
Reattività: mantenere un'interfaccia utente fluida.
Gestione di compiti asincroni: come il download di file o il caricamento di dati.

## 🛠️ Creare un Thread in Java

In Java ci sono due modi principali per creare un thread:

1. Estendere la classe Thread

```
class MioThread extends Thread {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Esecuzione del thread: " + i);
            try {
                Thread.sleep(1000); // Pausa di 1 secondo
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        MioThread t = new MioThread();
        t.start(); // Avvia il thread
    }
}
```

## 👉 Spiegazione:

- run(): contiene il codice eseguito dal thread.
- start(): avvia il thread, eseguendo il metodo run() .
- sleep(): sospende temporaneamente l'esecuzione del thread.

2. Implementare l'interfaccia Runnable

```
class MioRunnable implements Runnable {
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Esecuzione Runnable: " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        Thread t = new Thread(new MioRunnable());
        t.start();
    }
}

```

## 👉 Differenze principali:

- Estendere Thread: Più semplice ma meno flessibile (non puoi estendere altre classi).
- Implementare Runnable: Più modulare e compatibile con l'ereditarietà.

## 🔄 Sincronizzazione dei Thread

Quando più thread accedono a una risorsa condivisa, possono verificarsi condizioni di gara. Per evitarle si usa la parola chiave synchronized.

Esempio con sincronizzazione

```
class Contatore {
    private int valore = 0;

    public synchronized void incrementa() {
        valore++;
    }

    public int getValore() {
        return valore;
    }
}

class MioThread extends Thread {
    private Contatore contatore;

    public MioThread(Contatore contatore) {
        this.contatore = contatore;
    }

    public void run() {
        for (int i = 0; i < 1000; i++) {
            contatore.incrementa();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Contatore c = new Contatore();

        MioThread t1 = new MioThread(c);
        MioThread t2 = new MioThread(c);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Valore finale: " + c.getValore());
    }
}
```

## 👉 Cosa succede qui?

- synchronized: garantisce che solo un thread alla volta esegua il metodo incrementa().

- join(): fa attendere il thread principale finché t1 e t2 terminano.

## 📊 Stato di un Thread

Un thread in Java può essere in diversi stati:

| Stato             | Descrizione                           |
|-------------------|---------------------------------------|
| **NEW**          | Creato ma non ancora avviato          |
| **RUNNABLE**     | In esecuzione o pronto per eseguire   |
| **BLOCKED**      | In attesa di un lock                  |
| **WAITING**      | In attesa indefinita di un segnale    |
| **TIMED_WAITING**| In attesa per un periodo definito     |
| **TERMINATED**   | Ha completato l'esecuzione   



## 🎮 Esempio: Gara tra Thread

Ecco un semplice programma che simula una corsa tra tre thread:

```
class Corridore extends Thread {
    private String nome;

    public Corridore(String nome) {
        this.nome = nome;
    }

    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println(nome + " ha percorso " + i + " metri");
            try {
                Thread.sleep((int) (Math.random() * 500));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(nome + " ha terminato la corsa!");
    }

    public static void main(String[] args) {
        Corridore c1 = new Corridore("Corridore 1");
        Corridore c2 = new Corridore("Corridore 2");
        Corridore c3 = new Corridore("Corridore 3");

        c1.start();
        c2.start();
        c3.start();
    }
}
```

## 👉 Come funziona?

Ogni thread rappresenta un corridore che percorre 10 metri.
Thread.sleep() simula una pausa casuale per rappresentare la velocità variabile.
Vince il corridore che stampa "ha terminato la corsa!" per primo.


## 🎮 Esempio: Gara tra Thread con Grafica

Ecco un semplice programma che simula una corsa tra tre thread con una semplice interfaccia grafica:

Codice java:

```
import javax.swing.*;
import java.awt.*;

class Gara extends JFrame implements Runnable {
    private JPanel pista;
    private JLabel corridore;
    private int posizione = 0;

    public Gara(String nome, int y) {
        setTitle("Gara tra Thread");
        setSize(600, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(null);

        pista = new JPanel();
        pista.setBounds(10, y, 560, 50);
        pista.setBorder(BorderFactory.createLineBorder(Color.BLACK));
        add(pista);

        corridore = new JLabel(nome);
        corridore.setBounds(10, 10, 100, 30);
        pista.add(corridore);

        setVisible(true);
    }

    public void run() {
        while (posizione < 450) {
            posizione += (int) (Math.random() * 10);
            corridore.setLocation(posizione, 10);
            try {
                Thread.sleep((int) (Math.random() * 100));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(corridore.getText() + " ha terminato la corsa!");
    }

    public static void main(String[] args) {
        Gara g1 = new Gara("Corridore 1", 30);
        Gara g2 = new Gara("Corridore 2", 100);
        Gara g3 = new Gara("Corridore 3", 170);

        new Thread(g1).start();
        new Thread(g2).start();
        new Thread(g3).start();
    }
}
```


## 📌 Consigli pratici

- Usa ExecutorService per una gestione avanzata dei thread.
- Evita race condition usando synchronized, Lock o Atomic.
- Usa Thread.sleep() con attenzione: non blocca altri thread, ma rallenta l'esecuzione del thread corrente.


## 🚀 Buona programmazione con i thread in Java!



## 🚀 Dimenticavo.. Per gli amanti del Python ecco una versione Rock

Ecco un esempio di utilizzo dei thread in Python, insieme a una simulazione grafica per illustrare l'esecuzione concorrente di più thread. In questo caso, useremo la libreria threading per creare thread e la libreria matplotlib per rappresentare graficamente il loro comportamento.

L'esempio simula più thread che eseguono un compito semplice, rappresentato come punti che si muovono su una griglia:

Creazione di più thread: Ogni thread eseguirà una funzione che rappresenta un'operazione concorrente.
Simulazione grafica: Ogni thread muoverà un punto sulla griglia, mostrando l'esecuzione simultanea.


Ecco il codice **python**: 


```
import threading
import time
import random
import matplotlib.pyplot as plt

# Variabili globali per la grafica
x_values = [0, 0, 0]
y_values = [0, 0, 0]
colors = ['r', 'g', 'b']

# Funzione eseguita da ciascun thread
def move_point(thread_id, max_steps):
    global x_values, y_values
    for step in range(max_steps):
        x_values[thread_id] += random.randint(-1, 1)  # Movimento casuale in x
        y_values[thread_id] += random.randint(-1, 1)  # Movimento casuale in y
        time.sleep(0.2)  # Simulazione di lavoro
        print(f"Thread {thread_id} - Step {step}: ({x_values[thread_id]}, {y_values[thread_id]})")

# Funzione per aggiornare la grafica
def update_graph():
    plt.ion()  # Modalità interattiva
    fig, ax = plt.subplots()
    ax.set_xlim(-10, 10)
    ax.set_ylim(-10, 10)

    while True:
        ax.clear()
        ax.set_xlim(-10, 10)
        ax.set_ylim(-10, 10)
        ax.scatter(x_values, y_values, c=colors)  # Disegna i punti
        plt.draw()
        plt.pause(0.5)  # Aggiorna la grafica ogni 0.5 secondi

# Creazione e avvio dei thread
threads = []
num_threads = 3
max_steps = 20

for i in range(num_threads):
    t = threading.Thread(target=move_point, args=(i, max_steps))
    threads.append(t)
    t.start()

# Avvio del grafico in un thread separato
graph_thread = threading.Thread(target=update_graph)
graph_thread.start()

# Attendere che tutti i thread finiscano
for t in threads:
    t.join()

# Chiudere la finestra grafica una volta completata l'esecuzione
plt.ioff()
plt.show()

```


## Descrizione del codice:
- move_point(thread_id, max_steps): Simula il movimento di un punto in modo casuale su una griglia. Ogni thread esegue questa funzione e muove un punto in modo indipendente.
- update_graph(): Aggiorna la rappresentazione grafica in tempo reale, mostrando i punti muoversi sul grafico.
- Thread di movimento e thread di grafica: I thread vengono creati e avviati per eseguire il movimento dei punti, e un altro thread è responsabile della visualizzazione grafica in tempo reale.

## Cosa vedrai:
I punti sul grafico si muoveranno in direzioni casuali, simulando l'esecuzione concorrente dei thread. Ogni thread è associato a un punto di colore diverso (rosso, verde e blu) e si muove in base alla sua logica interna, rappresentando il concetto di programmazione concorrente.
