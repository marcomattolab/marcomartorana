---
Title: Thread in Java
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/collections2.jpg"
Description: "Guida sui Thread in Java"
Draft: 
---

# Guida ai Thread in Java

## 🧵 Cos'è un Thread?

Un thread è un singolo flusso di esecuzione di un programma. In Java, ogni programma ha almeno un thread principale (chiamato main thread). L'uso dei thread permette di eseguire più compiti contemporaneamente (programmazione concorrente).

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
- start(): avvia il thread, eseguendo run() in parallelo.
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


## 📌 Consigli pratici

- Usa ExecutorService per una gestione avanzata dei thread.
- Evita race condition usando synchronized, Lock o Atomic.
- Usa Thread.sleep() con attenzione: non blocca altri thread, ma rallenta l'esecuzione del thread corrente.


## 🚀 Buona programmazione con i thread in Java!
