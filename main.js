/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
/*global gra, Pionek */

function Gracz(numer, kolor) {
    this.numer = numer;
    this.kolor = kolor;
    this.pionki = [4];
    this.pawns = [4];
    this.numerWybranegoPionka = '';
    this.oczka = 0;
    this.wybrano = '';
    this.nrWybranegoPionka = 0;
    this.postawPionka = function () {
        var x, y;
        var nrPionka = this.wybrano[2];
        this.nrWybranegoPionka = this.wybrano[2];
        this.nrWybranegoPionka = nrPionka - 1;
        this.pionki[nrPionka - 1].pole = this.kolor + 9;
        x = document.getElementById(this.pionki[nrPionka - 1].pole);
        //x.innerHTML = this.pionki[nrPionka - 1].nazwa;
        x.appendChild(this.pawns[nrPionka - 1]);
        this.pionki[nrPionka - 1].ruchy = 0;
        y = document.getElementById(this.wybrano[1] + "s" + this.wybrano[2]);
        y.innerHTML = "";
        this.pionki[this.nrWybranegoPionka].naPlanszy = true;
        this.pionki[this.nrWybranegoPionka].naStarcie = false;
        //window.alert("czy zmienił się stan pionka .naPlanszy? " + this.pionki[this.nrWybranegoPionka].naPlanszy);
    };

    this.wykonajRuch = function () {
        var currentPosition, tempNr, tempTabNr, tempTabChar, tempChar, newNumber, z;


    };

    this.makePionek = function () {                         //utworzenie zestawu 4 pionków dla jednego z graczy
        var kolorPionka, numerPionka, poleStartowe, i, x;
        var img_g = [4];
        var img_y = [4];
        var img_b = [4];
        var img_r = [4];
        //var img_gg = document.createElement('img');
         //   img_g.src = "/obrazy/green_pawn.png";
        for (i = 0; i < 4; i += 1) {                        //przygotowanie graficznej reprezentacji pionka
            img_g[i] = document.createElement('img');
            img_g[i].src = "/obrazy/green_pawn.png";
            img_y[i] = document.createElement('img');
            img_y[i].src = "/obrazy/yellow_pawn.png";
            img_b[i] = document.createElement('img');
            img_b[i].src = "/obrazy/blue_pawn.png";
            img_r[i] = document.createElement('img');
            img_r[i].src = "/obrazy/red_pawn.png";
        }

        for (i = 0; i < 4; i += 1) {                    
            this.pionki[i] = new Pionek("p" +this.kolor + (i + 1), this.kolor, i + 1, this.kolor + "s" + (i + 1), 0); //(nazwa, kolor, nr, pole, ruchy)
            x = document.getElementById(this.kolor + "s" + (i + 1)); // weź id jednego z  pól startowych
           // x.innerHTML = this.kolor + (i + 1);
            if (this.kolor == "g") {
                x.appendChild(img_g[i]);                // umieść element 'img' w polu startowym
                img_g[i].classList.add("pieces");           // dodanie klasy konfigurującej wygląd obrazu
                img_g[i].id = "p" + this.kolor + (i + 1);   // nadanie elementowi 'img' unikalnego id
                this.pawns[i] = img_g[i];                   
                this.pionki[i].pawn = img_g[i];        // element zostaje przypisany do pola 'pawn' wcześniej utworzonego pionka
            } else if (this.kolor == "y") {
                x.appendChild(img_y[i]);
                img_y[i].classList.add("pieces");
                img_y[i].id = "p" + this.kolor + (i + 1);
                this.pawns[i] = img_y[i];
                this.pionki[i].pawn = img_y[i];
            } else if (this.kolor == "b") {
                x.appendChild(img_b[i]);
                img_b[i].classList.add("pieces");
                img_b[i].id = "p" + this.kolor + (i + 1);
                this.pawns[i] = img_b[i];
                this.pionki[i].pawn = img_b[i];
            } else {
                x.appendChild(img_r[i]);
                img_r[i].classList.add("pieces");
                img_r[i].id = "p" + this.kolor + (i + 1);
                this.pawns[i] = img_r[i];
                this.pionki[i].pawn = img_r[i];
            }
        }
    };
    this.rzutKostki = function () {
        var liczbaOczek = Math.floor(Math.random() * 6 + 1);
        var x;
        x = document.getElementById("oczka");
        x.innerHTML = liczbaOczek;
        this.oczka = liczbaOczek;
    };
    
    this.przetwarzanie = function (obiekt) {
        this.rzutKostki();
        var licznik = 0;
        if (this.oczka !== 6) {
            if (this.pionki[0].naPlanszy !== true && this.pionki[1].naPlanszy 
                !== true && this.pionki[2].naPlanszy !== true && this.pionki[3].naPlanszy !== true) {
                obiekt.przelaczKolejke();
            } else {
                //czy na planszy jest więcej niż 1 pionek?
                var i;
                for (i = 0; i < 4; i += 1) {
                    if (this.pionki[i].naPlanszy === true) {
                        licznik += 1;
                    }
                }
                if (licznik > 1) {
                    //wybierz klikając dowolny pionek na planszy
                    obiekt.wyborPionkaPlansza = true;
                    //przesuń pionka o wybraną liczbę oczek
                    //przełącz kolejkę
                    } else {
                    //przesuń pionka o wybraną liczbę oczek
                        for (i = 0; i < 4; i += 1) {
                            if (this.pionki[i].naPlanszy === true) {
                                gra.kolejka[gra.kolej].pionki[i].x = this.oczka;
                                gra.kolejka[gra.kolej].pionki[i].move();
                            }
                        }
                    //przełącz kolejkę
                        obiekt.przelaczKolejke();
                    }
            }
        } else {
            //czy na polu startowym jest przynajmniej 1 pionek?
            var licznikS = 0;
            var i;
            for (i = 0; i < 4; i += 1) {
                if (this.pionki[i].naStarcie === true) {
                    licznikS += 1;
                }
            }
            
            if (licznikS > 0) {
                //czy jakiś pionek został umieszczony na planszy?
                var i;
                var licznikP = 0;
                for (i = 0; i < 4; i += 1) {
                    if (this.pionki[i].naPlanszy === true) {
                        licznikP += 1;
                    }
                }
                if (licznikP > 0) {
                    //chcesz postawić nowego pionka na planszy czy ruszyć się pionkiem z planszy?
                    obiekt.wyborPionkaPlansza = true;
                    obiekt.wyborPionkaStart = true;
                } else {
                    //wybierz dowolnego pionka z pola startowego
                    //postaw tego pionka na planszy
                    //przełącz kolejkę
                    obiekt.wyborPionkaStart = true;
                }
            } else {
                //wybierz klikając dowolny pionek na planszy
                //przesuń pionka o wybraną liczbę oczek
                //przełącz kolejkę
                obiekt.wyborPionkaPlansza = true;
            }
        }
    }; 
}

function Gra() {
    this.gracze = [4];
    this.kolejka = [];
    this.kolej = 0;
    this.wyborPionkaPlansza = false;
    this.wyborPionkaStart = false;
    this.przelaczKolejke = function () {
        if (this.kolej + 1 > this.kolejka.length - 1) {
            this.kolej = 0;
        } else {
            this.kolej += 1;
        }
        this.kolej_komunikat();
    };

    this.kolej_komunikat = function () {
        x = document.getElementById("kolej_komunikat");
        x.innerHTML = "kolej " + gra.kolejka[gra.kolej].kolor;
    }
    
    this.add = function (obiekt) {
        this.gracze[obiekt.numer - 1] = obiekt;
    };
    this.sortuj = function (gracze) {
        var i;
        for (i = 0; i < 4; i += 1) {
            if (typeof this.gracze[i] === 'object') {
                this.kolejka.push(this.gracze[i]);
            }
        }
        this.kolej_komunikat();
    };
}
var gra = new Gra();

function Pionek(nazwa, kolor, numer, pole, ruchy) {
    "use strict";
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.numer = numer;
    this.pole = pole;
    this.ruchy = ruchy;
    this.x = 0;
    this.naPlanszy = false;
    this.naStarcie = true;
    this.pawn;
   
    this.move = function () {
        var currentPosition, tempNr, tempTabNr, tempTabChar, tempChar, newNumber, z;
        tempTabNr = this.pole.match(/(\d+)/);
        tempNr = parseInt(tempTabNr[0], 10);
        tempTabChar = this.pole.replace(/[^a-z]/gi, '');
        tempChar = tempTabChar[0];
        //window.alert("tempNr= " + tempNr + ", tempChar= " + tempChar);
        if (this.ruchy > 5 && this.kolor === tempChar) {
            if ((this.x + tempNr) > 7 && (this.x + tempNr) < 14) {
                newNumber = this.x + tempNr + 6;
                currentPosition = tempChar + newNumber;
                z = document.getElementById(this.pole);
                z.innerHTML = "";
                this.pole = currentPosition;
            } else if ((this.x + tempNr) <= 7) {
                currentPosition = tempChar + (tempNr + this.x);
                z = document.getElementById(this.pole);
                z.innerHTML = "";
                this.pole = currentPosition;
            } else {
                if ((this.x + tempNr) > 19) {
                    newNumber = 19 - ((this.x + tempNr) - 19);
                    currentPosition = tempChar + newNumber;
                    z = document.getElementById(this.pole);
                    z.innerHTML = "";
                    this.pole = currentPosition;
                } else if ((this.x + tempNr) === 19) {
                    window.alert("META! \r\n Pionek wraca na swoje pole startowe.");
                    currentPosition = tempChar + 9;
                    z = document.getElementById(this.pole);
                    z.innerHTML = "";
                    this.pole = currentPosition;
                    this.ruchy = 0;
                } else {
                    currentPosition = tempChar + (tempNr + this.x);
                    z = document.getElementById(this.pole);
                    z.innerHTML = "";
                    this.pole = currentPosition;
                }
            }
        } else {
            //window.alert("else");
            if ((this.x + tempNr) > 13) {
                if (tempChar === "r") {
                    newNumber = (this.x + tempNr) - 13;
                    currentPosition = "g" + newNumber;
                    //z = document.getElementById(this.pole);
                    //z.innerHTML = "";
                    this.pole = currentPosition;
                } else if (tempChar === "g") {
                    newNumber = (this.x + tempNr) - 13;
                    currentPosition = "y" + newNumber;
                    //z = document.getElementById(this.pole);
                    //z.innerHTML = "";
                    this.pole = currentPosition;
                } else if (tempChar === "y") {
                    newNumber = (this.x + tempNr) - 13;
                    currentPosition = "b" + newNumber;
                    //z = document.getElementById(this.pole);
                    //z.innerHTML = "";
                    this.pole = currentPosition;
                } else if (tempChar === "b") {
                    newNumber = (this.x + tempNr) - 13;
                    currentPosition = "r" + newNumber;
                    //z = document.getElementById(this.pole);
                    //z.innerHTML = "";
                    this.pole = currentPosition;
                }
            } else {
                //z = document.getElementById(this.pole);
                //z.innerHTML = "";
                currentPosition = tempChar + (tempNr + this.x);
                this.pole = currentPosition;
            }
        }
        z = document.getElementById(this.pole);
        //z.innerHTML = this.nazwa;
        z.appendChild(this.pawn);
        this.ruchy = this.ruchy + 1;
    };
}


var kolory = ["r", "b", "g", "y"];

function makePionek() {
    "use strict";
    var randomNr, kolorPionka, numerPionka, poleStartowe;
    randomNr = Math.floor(Math.random() * 4);
    kolorPionka = kolory[randomNr];
    numerPionka = 1;
    if (kolorPionka === "r") {
        poleStartowe = "r9";
    } else if (kolorPionka === "b") {
        poleStartowe = "b9";
    } else if (kolorPionka === "g") {
        poleStartowe = "g9";
    } else {
        poleStartowe = "y9";
    }
    return new Pionek("P", kolorPionka, numerPionka, poleStartowe);
}

var temp;
document.addEventListener('click', function (e) {
    "use strict";
    //window.alert(e.target.innerHTML);
    //window.alert(e.target.id);
    temp = e.target.id;                        //id pionka
    var id = e.target.parentNode.id;           //id pola na którym stoi pionek
    if (temp[1] === gra.kolejka[gra.kolej].kolor &&             //jeśli wybrano pionek nalezący do gracza, którego jest kolej && 
            id[1] === "s" && gra.wyborPionkaStart === true) {   // id pola wskazuje na pole startu && na kostce wypadło "6"
        gra.kolejka[gra.kolej].wybrano = temp;
        gra.kolejka[gra.kolej].postawPionka();
        gra.przelaczKolejke();
        //gra.kolej_komunikat();
        gra.wyborPionkaStart = false;
        gra.wyborPionkaPlansza = false;
    }
    if (((e.target && e.target.parentNode.id === gra.kolejka[gra.kolej].pionki[0].pole) ||
            (e.target && e.target.parentNode.id === gra.kolejka[gra.kolej].pionki[1].pole) ||
            (e.target && e.target.parentNode.id === gra.kolejka[gra.kolej].pionki[2].pole) ||
            (e.target && e.target.parentNode.id === gra.kolejka[gra.kolej].pionki[3].pole)) && gra.wyborPionkaPlansza === true) {
        gra.kolejka[gra.kolej].nrWybranegoPionka = temp[2] - 1;
        gra.kolejka[gra.kolej]
            .pionki[gra.kolejka[gra.kolej].nrWybranegoPionka].x = gra.kolejka[gra.kolej].oczka;
        gra.kolejka[gra.kolej]
            .pionki[gra.kolejka[gra.kolej].nrWybranegoPionka].move();
        gra.przelaczKolejke();
        //gra.kolej_komunikat();
        gra.wyborPionkaPlansza = false;
        gra.wyborPionkaStart = false;
    }
});

//wybór kolorów przez gracza 1
document.getElementById("ok1").onclick = function () {
    "use strict";
    var kolor, numer;
    var e = document.getElementById("select1");
    var code = e.options[e.selectedIndex].value.replace(/[^a-z]/gi, '');
    if (code === "g") {
        kolor = "g";
        numer = 1;
    } else if (code === "y") {
        kolor = "y";
        numer = 2;
    } else if (code === "b") {
        kolor = "b";
        numer = 3;
    } else {
        kolor = "r";
        numer = 4;
    }
    document.getElementById("panel1").innerHTML = "Gracz 1: " + kolor;
    gra.add(new Gracz(numer, kolor));
    gra.gracze[numer - 1].makePionek();
};
//wybór kolorów przez gracza 2
document.getElementById("ok2").onclick = function () {
    "use strict";
    var kolor, numer;
    var e = document.getElementById("select2");
    var code = e.options[e.selectedIndex].value.replace(/[^a-z]/gi, '');
    if (code === "g") {
        kolor = "g";
        numer = 1;
    } else if (code === "y") {
        kolor = "y";
        numer = 2;
    } else if (code === "b") {
        kolor = "b";
        numer = 3;
    } else {
        kolor = "r";
        numer = 4;
    }
    document.getElementById("panel2").innerHTML = "Gracz 2: " + kolor;
    gra.add(new Gracz(numer, kolor));
    gra.gracze[numer - 1].makePionek();
    gra.sortuj(this.gracze);
};

document.getElementById("losowanie").onclick = function () {
    "use strict";
    gra.kolejka[gra.kolej].przetwarzanie(gra);
    //window.alert(gra.kolejka[0].kolor);
   /* var i;
    var tekst = " ";
    for (i = 0; i < 4; i += 1) {
        if (gra.gracze[i] !== undefined) {
            window.alert(i + " " + typeof gra.gracze[i] + " " + gra.gracze[i].kolor);
        } else {
            window.alert(i + "undefined");
        }
    }
    for (i = 0; i < gra.kolejka.length; i += 1) {
        if (gra.kolejka[i] !== undefined) {
            window.alert(i + " " + typeof gra.kolejka[i] + " " + gra.kolejka[i].kolor);
        } else {
            window.alert(i + "undefined");
        }
    } */
    //window.alert("Ostatni alert testowy gra.kolejka[0] = " + gra.kolejka[0].kolor);
};

