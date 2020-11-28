# Hópverkefni 2

Jón Guðjónsson
jog35@hi.is

Til þess að setja upp verkefni skal keyra skipunina "npm install" í rót verkefnisins.

Eftirfarandi skipanir eru útfærðar í package.json skrá verkefnisins.

"npm run build": þýðir javascript skrár sem geymdar eru í möppunni ./src með rollup yfir í skrárnar sem html síður nota og geymdar eru undir ./dist
"npm run browser-sync": keyrir browser-sync viðbót
"npm run rollup-watch": keyrir rollup þýðanda í watch ham.
"npm run sass": þýðir sass skrár sem geymdar eru í möppunni ./styles yfir í skránna styles.css sem html síður nota og geymd er í rót verkefnisins.
"npm run sass-watch": keyrir sass í watch ham.
"npm run dev": keyrir browser-sync viðbot með bæði rollup og sass í watch ham.
"npm run lint_css": keyrir linter fyrir scss skrár í möppunni ./styles.
"npm run lint_js": keyrir linter fyrir javascript skrár í möppunni ./src

Uppbygging verkefnis:

Verkefnið samanstendur af tveimur html skjölum (index.html og videos.html), þremur javascript skrám (index.js, videos.js og utils.js) og fjórum scss skrám (globa.scss, grid.scss og videoplayer.scss).

Útskýring á html hluta:
 
1. Index.html er geymd í rót verkefnisins og inniheldur grunn þar sem teiknaður er listi af video-um með javascript þegar síðan er opnuð.
2. videos.html inniheldur grunn þar sem javascript hleður upp video til afspilunar. video.html er geymd í möppunni ./pages

Útskýring á javascript hluta:

-Rollup er notað til þess 

1. Javascript skráin index.js inniheldur þá virkni sem notuð er á síðunni index.html. Skráin sækir gögn úr videos.json (sem geymd er í rót verkefnisins) þegar búið er að hlaða upp grunn síðunnar.
   Síðan eru upplýsingar úr henni notaðar til þess að teikna inn lista af myndböndum (með hjálparfalli úr javascript skránni utils.js).
2. Javascript skráin videos.js inniheldur þá virkni sem notuð er á síðunni videos.html. Skráin útfærir stjórnborð fyrir video og sækir upplýsingar um það hvaða myndband notandinn vill horfa á
   úr url streng (númer myndbands). Síðan sækir forritið nauðsynleg gögn ur skránni videos.json og notar þau til þess að hlaða inn réttu myndbandi og lista yfir tengd myndbönd.
3. Javascript skráin util inniheldur 4 hjálparföll. Tvö þeirra eru til þess að teikna eigindi í html skjal og hin tvö eru til þess að færa lengd myndbanda á rétt form (fallið formatLength) og til þess að 
   færa streng sem lýsir aldri myndbands á rétt form (fallið videoAge).

Útskýring á css hluta:

1. Skráin grid.scss inniheldur lýsingu á griddi sem notað er til þess að raða eigindum rétt upp.
2. Skráin global.scss inniheldur útlitslýsingar á öllum hlutum index.html og videos.html öðrum en video-spilaranum sjálfum.
3. Skráin videoplayer inniheldur útlitslýsingar á video-spilara á síðunni videos.html.

