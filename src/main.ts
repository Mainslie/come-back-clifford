export interface Location {
    height: number;
    width: number;
}

class Field {
    clifford = "^";
    poop = "O";
    fieldCharacter = "░";
    owner = "*";
    height: number;
    width: number;
    locations = new Set<Location>();
    map = [];

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
        this.generate();
    }

    // create initial field
    generate() {
        this.map = new Array(this.height);

        for (var i = 0; i < this.height; i++) {
            this.map[i] = new Array(this.width).fill(this.fieldCharacter);
        }
        this.addSpots();
    }

    addToMap(height: number, width: number, spot: string) {
        this.map[height][width] = spot;
        this.locations.add({ height, width });
    }

    // random spot selector

    selectRandomSpot(): Location {
        const height = Math.floor(Math.random() * this.height);
        const width = Math.floor(Math.random() * this.width);

        return { height, width };
    }

    calculatePoopArea() {
        const forthOfHeight = Math.floor(this.height / 4);
        const forthOfWidth = Math.floor(this.width / 4);
        return forthOfHeight * forthOfWidth;
    }

    addSpots() {
        // set owner in array[0][0]
        const addPlayer = () => {
            this.addToMap(0, 0, this.owner);
        };

        //set clifford in random spot in array[][]
        const addClifford = () => {
            //add random spot to location set
            const { height, width } = this.selectRandomSpot();
            this.addToMap(height, width, this.clifford);
        };

        // set poop in 1:4 of array
        const addPoops = () => {
            // loop through set until reaching size of poop area.
            for (var i = 0; i <= this.calculatePoopArea(); i++) {
                const { height, width } = this.selectRandomSpot();
                // if the set grows , add the new spot to the field
                if (this.map[height][width] === this.fieldCharacter) {
                    this.addToMap(height, width, this.poop);
                }
            }
        };

        addPlayer();
        addClifford();
        addPoops();
    }

    printField() {
        console.log(this.map);
    }
}

const newField = new Field(10, 10);
newField.printField();
