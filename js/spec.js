var earth = {
    isRound: true,
    numberFromSun: 3
};

describe("Earth", function () {
    it("is round", function () {
        expect(earth.isRound).toBe(true);
    });
    it("is the third planet from the sun", function () {
        expect(earth.numberFromSun).toBe(3);
    });
});

//================================= All Matchers until now
describe("Jasmine Matchers", function () {

    it("allows for === and deep equality", function () {
        expect(1+1).toBe(2);
        expect([1,2,3]).toEqual([1,2,3]);
    });

    it("allows for easy precision cheking", function () {
        expect(3.1415).toBeCloseTo(3.14,2);
    });

    it("allows for easy truthy / falsey checking", function () {
        expect(0).toBeFalsy();
        expect([]).toBeTruthy();
    });

    it("allows for checking contents of an object", function () {
        expect([1,2,3]).toContain(1);
        expect({name:"Elie"}).toEqual(jasmine.objectContaining({name:"Elie"}));
    });

    it("allows for easy type checking", function () {
        expect([]).toEqual(jasmine.any(Array));
        expect(function (){}).toEqual(jasmine.any(Function));
    });
});

//================================== Full test
describe("Arrays", function () {
    var arr;
    beforeEach(function () {
        arr = [1,3,5];
    });

    it("adds elements to an array", function () {
        arr.push(7);
        expect(arr).toEqual([1,3,5,7]);
    });

    it("returns the new length of the array", function () {
        expect(arr.push(7)).toBe(4);
    });

    it("adds anything into the array", function () {
        expect(arr.push({})).toBe(4);
    });
});

//=================================== upperscope variables for DB tests especially - teardown (reset)
describe("Counting", function () {
    var count = 0;

    beforeEach(function () {
        count++;
    });

    afterEach(function () {
        count = 0;
    });

    it("has a counter that increments", function () {
        expect(count).toBe(1);
    });

    it("gets reset", function () {
        expect(count).toBe(1);
    });
});

//=================================== beforeAll / afterAll
var arr = [];
beforeAll(function () {
    arr = [1,2,3];
});

describe("Counting", function () {
    it("starts with an array", function () {
        arr.push(4);
        expect(1).toBe(1);
    });

    it("keeps mutating that array", function () {
        console.log(arr); // [1,2,3,4]
        arr.push(5);
        expect(1).toBe(1);
    });
});

describe("Again", function () {
    it("keeps mutating the array... again", function () {
        console.log(arr) // [1,2,3,4,5]
        expect(1).toBe(1);
    });
});

//==================================== Nesting Describe - when big test like Arrays are cut into smaller blocks

describe("Array", function () {
    var arr;
    beforeEach(function () {
        arr = [1,2,3];
    });

    describe("#unshift", function () { // Nested One
        it("adds an element to the beginning of an array", function () {
            arr.unshift(17);
            expect(arr[0]).toBe(17);
        });
        it("returns the new length", function () {
            expect(arr.unshift(1000)).toBe(4);
        });
    });

    describe("#push", function () { // Nested Two
        it("adds elements to the end of an array", function () {
            arr.push(7);
            expect(arr[arr.length-1]).toBe(7);
        });
        it("returns the new length", function () {
            expect(arr.push(1000)).toBe(4);
        });
    });

});


//==================================== Pending Tests

describe("Pending specs", function () {

    xit("can start with an xit", function () {
        expect(true).toBe(true);
    });

    it("is a pending test if there is no callback function");

    it("is pending if the pending function is invoked inside the callback", function () {
        expect(2).toBe(2);
        pending();
    });

});

// ==================================== SPIES ====================================

// ==================================== Creating a spy
function add(a,b,c){
    return a+b+c;
}

describe("Function add", function () {
    var addSpy, result;
    beforeEach(function () {
        addSpy = spyOn(window, "add");
        result = addSpy();
    });

    it("can have params tested", function () {
        expect(addSpy).toHaveBeenCalled(); // new matcher
    });
});

// ==================================== Testing parameters

describe("Function add", function () {
    var addSpy, result;
    beforeEach(function () {
        addSpy = spyOn(window, "add");
        result = addSpy(1,2,3);
    });

    it("can have params tested", function () {
        expect(addSpy).toHaveBeenCalled();
        expect(addSpy).toHaveBeenCalledWith(1,2,3); // new matcher - parameters
    });
});

// ==================================== Testing the return value

describe("Function add", function () {
    var addSpy, result;
    beforeEach(function () {
        addSpy = spyOn(window, "add").and.callThrough(); //checking with dummy numbers
        result = addSpy(1,2,3);
    });

    it("can have a return value tested", function () {
        expect(result).toEqual(6);
    });
});

// ===================================== Testing frequency

describe("Function add", function () {
    var addSpy, result;
    beforeEach(function () {
        addSpy = spyOn(window, "add").and.callThrough();
        result = addSpy(1,2,3);
    });

    it("can have params tested", function () {
        expect(addSpy.calls.any()).toBe(true);
        expect(addSpy.calls.count()).toBe(1); // test runs just once
        expect(result).toEqual(6);
    });
});

// ==================================== CLOCK ====================================

// Installing and uninstalling the clock after each unit tested

describe("A simple setTimeout", function () {
    var sample;
    beforeEach(function () {
        sample = jasmine.createSpy("sampleFunction");
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("is only invoked after 1000 milliseconds", function () {
        setTimeout(function () {
            sample();
        }, 1000);
        jasmine.clock().tick(999); // moves the clock ahead by 999 ms
        expect(sample).not.toHaveBeenCalled();
        jasmine.clock().tick(1);
        expect(sample).toHaveBeenCalled();
    });

});

describe("A simple setInterval", function () {
    var dummyFunction;

    beforeEach(function () {
        dummyFunction = jasmine.createSpy("dummyFunction");
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("checks to see the number of times the function is invoked", function () {
        setInterval(function () {
            dummyFunction();
        }, 1000);
        jasmine.clock().tick(999);
        expect(dummyFunction.calls.count()).toBe(0);
        jasmine.clock().tick(1000);
        expect(dummyFunction.calls.count()).toBe(1);
        jasmine.clock().tick(1);
        expect(dummyFunction.calls.count()).toBe(2);
    });

});


// =========================================== Async Tests

function getUserInfo(username) {
    return $.getJSON("https://api.github.com/users/" + username);
}

describe("#getUserInfo", function () {
    it("returns the correct name for the user", function (done) {
        getUserInfo("wcywin").then(function (data) {
            expect(data.name).toBe("Wojciech Cywinski");
            done();
        });
    });
});



