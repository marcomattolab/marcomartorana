---
Title: Gioco del Tris in Java
Subtitle: ""
Date: 2023-01-01
Tags: ["informatics"]
image : "/img/collections/collections1.jpg"
Description: "Gioco del Tris (Tic-Tac-Toe) in Java con descrizione soluzione"
Draft: 
---

# 🕹️ Gioco del Tris (Tic-Tac-Toe) in Java

## 🎯 Obiettivo:
Creare un programma in Java che permetta a due giocatori di sfidarsi a Tris (0 X).

Il gioco si svolge su una griglia 3x3 e i giocatori, a turno, inseriscono il loro simbolo (X o O). Vince chi riesce a posizionare tre simboli consecutivi in orizzontale, verticale o diagonale.

## 📋 Requisiti:

Struttura del gioco:
- Usare un array bidimensionale per rappresentare la griglia 3x3.
- Mostrare il tabellone di gioco aggiornato dopo ogni mossa.

Regole del gioco:
- Due giocatori si alternano inserendo X o O.
- Validare l'input affinché:
- Le coordinate inserite siano comprese tra 1 e 3.
- La casella scelta sia vuota (non già occupata).

Terminare il gioco quando:
- Un giocatore ha vinto (tre simboli consecutivi).
- La griglia è piena (pareggio).

Metodi richiesti:
- stampaGriglia() – Mostra la griglia aggiornata.
- mossaValida() – Controlla se una mossa è valida.
- verificaVittoria() – Controlla se un giocatore ha vinto.
- gioca() – Gestisce il ciclo principale del gioco.

## 🧑‍💻 Codice Java:


```
import java.util.Scanner;

public class TicTacToe {

    public static void main(String[] args) {
        char[][] griglia = new char[3][3];
        inizializzaGriglia(griglia);
        gioca(griglia);
    }

    public static void inizializzaGriglia(char[][] griglia) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                griglia[i][j] = ' ';
            }
        }
    }

    public static void stampaGriglia(char[][] griglia) {
        System.out.println("  1 | 2 | 3 ");
        System.out.println(" -----------");
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.print("  " + griglia[i][j]);
                if (j < 2) System.out.print(" | ");
            }
            System.out.println();
            if (i < 2) System.out.println(" -----------");
        }
    }

    public static void gioca(char[][] griglia) {
        Scanner scanner = new Scanner(System.in);
        char giocatoreCorrente = 'X';
        boolean partitaInCorso = true;

        while (partitaInCorso) {
            stampaGriglia(griglia);
            System.out.println("Giocatore " + giocatoreCorrente + ", inserisci riga e colonna (1-3): ");

            int riga, colonna;

            while (true) {
                riga = scanner.nextInt() - 1;
                colonna = scanner.nextInt() - 1;

                if (mossaValida(griglia, riga, colonna)) {
                    griglia[riga][colonna] = giocatoreCorrente;
                    break;
                } else {
                    System.out.println("Mossa non valida. Riprova.");
                }
            }

            if (verificaVittoria(griglia, giocatoreCorrente)) {
                stampaGriglia(griglia);
                System.out.println("Il giocatore " + giocatoreCorrente + " ha vinto!");
                partitaInCorso = false;
            } else if (grigliaPiena(griglia)) {
                stampaGriglia(griglia);
                System.out.println("Pareggio! La griglia è piena.");
                partitaInCorso = false;
            } else {
                giocatoreCorrente = (giocatoreCorrente == 'X') ? 'O' : 'X';
            }
        }

        scanner.close();
    }

    public static boolean mossaValida(char[][] griglia, int riga, int colonna) {
        return (riga >= 0 && riga < 3 && colonna >= 0 && colonna < 3 && griglia[riga][colonna] == ' ');
    }

    public static boolean verificaVittoria(char[][] griglia, char giocatore) {
        for (int i = 0; i < 3; i++) {
            if ((griglia[i][0] == giocatore && griglia[i][1] == giocatore && griglia[i][2] == giocatore) ||
                (griglia[0][i] == giocatore && griglia[1][i] == giocatore && griglia[2][i] == giocatore)) {
                return true;
            }
        }

        return (griglia[0][0] == giocatore && griglia[1][1] == giocatore && griglia[2][2] == giocatore) ||
               (griglia[0][2] == giocatore && griglia[1][1] == giocatore && griglia[2][0] == giocatore);
    }

    public static boolean grigliaPiena(char[][] griglia) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (griglia[i][j] == ' ') {
                    return false;
                }
            }
        }
        return true;
    }
}

```


## 📸 Prova del programma:

Ecco uno screenshot durante una partita in corso:

![Visualize Algorithm](https://marcomartorana.it/img/collections/tic-tac-toe.png)

Stay tuned!