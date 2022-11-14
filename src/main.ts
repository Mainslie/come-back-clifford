export interface Location {
    height: number;
    width: number;
}

enum Spot {
    Clifford = "🦮",
    Poop = "💩",
    Owner = "🏃🏼‍♂️",
    Blank = "🟩",
}

class Field {
    height: number;
    width: number;
    locations = new Set<string>();
    map = [];
    percentageOfPoop = 0.2;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
        this.generate();
    }

    // create initial field
    generate() {
        this.map = new Array(this.height);

        for (var i = 0; i < this.height; i++) {
            this.map[i] = new Array(this.width).fill(Spot.Blank);
        }
        this.addSpots();
    }

    addToMap(height: number, width: number, spot: string) {
        this.map[height][width] = spot;
        this.locations.add(JSON.stringify({ height, width }));
    }

    isOnMap(height: number, width: number) {
        return this.locations.has(JSON.stringify({ height, width }));
    }

    // random spot selector

    selectRandomSpot(): Location {
        const height = Math.floor(Math.random() * this.height);
        const width = Math.floor(Math.random() * this.width);

        return { height, width };
    }

    calculateAmountOfPoop() {
        return Math.floor(this.height * this.width * this.percentageOfPoop);
    }

    addSpots() {
        // set owner in array[0][0]
        const addPlayer = () => {
            this.addToMap(0, 0, Spot.Owner);
        };

        //set clifford in random spot in array[][]
        const addClifford = () => {
            //add random spot to location set
            const { height, width } = this.selectRandomSpot();
            this.addToMap(height, width, Spot.Clifford);
        };

        // set poop in 1:4 of array
        const addPoops = () => {
            const poopAmount = this.calculateAmountOfPoop();
            // loop through set until reaching size of poop area.
            for (var i = 0; i <= poopAmount; i++) {
                const { height, width } = this.selectRandomSpot();
                // if the set grows , add the new spot to the field
                if (!this.isOnMap(height, width)) {
                    this.addToMap(height, width, Spot.Poop);
                }
            }
        };

        addPlayer();
        addClifford();
        addPoops();
    }

    printField() {
        for (var i = 0; i < this.height; i++) {
            console.log(this.map[i].join(""));
        }
    }
}

const newField = new Field(10, 10);
newField.printField();
