// Class to represent a row in the seat reservations grid
function class_(name, grade, credits) {
    var self = this;
    self.name = name;
    self.grade = ko.observable(grade);
    self.credits = ko.observable(credits);
}

// Overall viewmodel for this screen, along with initial state
function GradeViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.GPA = [
        { grade: "A+"},
        { grade: "A"},
        { grade: "A-"},
        { grade: "B+"},
        { grade: "B"},
        { grade: "B-"},
        { grade: "C+"},
        { grade: "C"},
        { grade: "C-"},
        { grade: "D+"},
        { grade: "D"},
        { grade: "D-"},
        { grade: "F"}
    ];    
    
    self.creditChoice = [
        { credits: 1},
        { credits: 2},
        { credits: 3},
        { credits: 4}
    ];
    
    // Editable data
    self.classes = ko.observableArray([
        new class_("Class", self.GPA[0], self.creditChoice[2]),
        new class_("Class", self.GPA[0], self.creditChoice[2]),
        new class_("Class", self.GPA[0], self.creditChoice[2])
    ]);

    // Operations
    self.addClass = function() {
        self.classes.push(new class_("Class", self.GPA[0], self.creditChoice[2]));
    }
    
    self.removeClass = function(class_) { self.classes.remove(class_) }
    
    // GPA Computation
    self.calculateGPA = ko.computed(function() {
        var finalGrade = 0;
        var gradePoint = 0;
        var totalPoints = 0.0; // quality points
        var totalCredits = 0; // credit hours
        var classLength = self.classes().length;
        var i = 0;
        for (i = 0; i < classLength; i++)
        {
            var classCredit = self.classes()[i].credits().credits;
            totalCredits += classCredit;
            switch(self.classes()[i].grade().grade)
            {
                case self.GPA[0].grade:
                    gradePoint = 4.0;
                    break;
                case self.GPA[1].grade:
                    gradePoint = 4.0;
                    break;
                case self.GPA[2].grade:
                    gradePoint = 3.67;
                    break;
                case self.GPA[3].grade:
                    gradePoint = 3.33;
                    break;
                case self.GPA[4].grade:
                    gradePoint = 3.0;
                    break;
                case self.GPA[5].grade:
                    gradePoint = 2.67;
                    break;
                case self.GPA[6].grade:
                    gradePoint = 2.33;
                    break;
                case self.GPA[7].grade:
                    gradePoint = 2.0;
                    break;
                case self.GPA[8].grade:
                    gradePoint = 1.67;
                    break;
                case self.GPA[9].grade:
                    gradePoint = 1.33;
                    break;
                case self.GPA[10].grade:
                    gradePoint = 1.0;
                    break;
                case self.GPA[11].grade:
                    gradePoint = 0.67;
                    break;
                default:  
                    gradePoint = 0;
            }
            if (gradePoint != 0)
            {
                totalPoints += gradePoint*classCredit;
            }
        }
        
        if (totalCredits != 0) 
        {   
            finalGrade = totalPoints/totalCredits;
        } 
        return finalGrade; 
    });
}

ko.applyBindings(new GradeViewModel());
