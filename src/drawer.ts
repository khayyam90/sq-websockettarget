export class drawer{
    private target: HTMLDivElement;
    private log: HTMLUListElement;
    private points: HTMLUListElement;
    private svg: HTMLElement;
    private scoreDiv: HTMLDivElement;
    private scoreEntier = 0;
    private scoreFlottant = 0;
    private nbImpacts = 0;

    public constructor(targetId: string, logId: string, pointsId: string, svgId: string, scoreId: string){
        this.target = <HTMLDivElement>document.getElementById(targetId);
        this.log = <HTMLUListElement>document.getElementById(logId);
        this.points = <HTMLUListElement>document.getElementById(pointsId);
        this.svg = <HTMLElement>document.getElementById(svgId);
        this.scoreDiv = <HTMLDivElement>document.getElementById(scoreId);
    }

    public addPoint(x:number, y:number){
        this.nbImpacts++;

        // affichage du log des infos reçues par le serveur
        let line = document.createElement("li");
        line.className = "list-group-item";
        line.innerHTML = x + ";" + y;
        this.log.append(line);

        // traduction en pixels et en points
        let ix = parseFloat(x.toString());
        let iy = parseFloat(y.toString());

        let valeurPoint = Math.sqrt((ix*ix) + (iy*iy));        

        // je considère que le rayon du plomb vaut 0.3 zones, histoire de mieux compter les cordons, même s'il vaudrait mieux compter en mm
        valeurPoint = 10.9 - valeurPoint + .3;
        let valeurPointEntier = Math.floor(valeurPoint);

        if (valeurPoint < 0){
            valeurPoint = 0;
            valeurPointEntier = 0;
        }

        this.scoreEntier += valeurPointEntier;
        this.scoreFlottant += valeurPoint;

        // traduction en pixels
        let pixelx = ((10+ix)/20*400);
        let pixely = ((10+iy)/20*400);

        let c = <SVGCircleElement>document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", ""+pixelx);
        c.setAttribute("cy", ""+pixely);
        c.setAttribute("fill", "red");
        c.setAttribute("r", "5");
        this.svg.appendChild(c);

        // on ajoute également le numéro de l'impact à côté de l'impact
        let t = <SVGTextElement>document.createElementNS("http://www.w3.org/2000/svg", "text");
        t.textContent = ""+this.nbImpacts;
        t.setAttribute("x", ""+(pixelx+5));
        t.setAttribute("y", ""+(pixely+5));
        t.innerHTML = "" + this.nbImpacts;
        this.svg.appendChild(t);


        // affichage des scores
        line = document.createElement("li");
        line.className = "list-group-item";
        line.innerHTML = valeurPointEntier + " (" + valeurPoint.toFixed(1) + ")";
        this.points.append(line);

        this.scoreDiv.innerHTML = "Score total : " + this.scoreEntier + " (" + this.scoreFlottant.toFixed(1) + ")";
    }
}