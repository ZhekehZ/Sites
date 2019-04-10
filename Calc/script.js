class Calculator{
  constructor() {
    this.value = "0";

    this.states = {
      READ_FST: "read fst argument",
      READ_SND: "read snd argument",
      DEFAULT: "dafault"
    };
    this.state = this.states.DEFAULT;

    this.fst = 0;
    this.snd = 0;

    this.operations = {
      DIV: "divide",
      ADD: "addition",
      SUB: "subtraction",
      MUL: "multiplication",
      NEG: "negative",
      SQT: "square root",
      NOP: "no operation"
    }
    this.operation = this.operations.NOP;
  };

  clear() {
    this.value = "0";
  }

  numBtn(val) {
    if (this.state == this.states.DEFAULT)
      this.state = this.states.READ_FST;

    switch (val) {
      case '1': case '2': case '3':
      case '4': case '5': case '6':
      case '7': case '8': case '9':
        if (this.value == "0" || this.value == "NaN" || this.value == '\u221E')
          this.value = "";
        if (this.value == "-0")
          this.value = "-";
        this.value += val;
        break;

      case '0':
        if (this.value != "0" && this.value != "-0")
          this.value += val;
        break;

      case '.':
        if (this.value.indexOf('.') == -1)
          this.value += val;
        break;
      default:
        break;
    }
  };

  processOP() {
    switch (this.operation) {
      case this.operations.ADD:
        this.value = "" + ((+this.fst) + (+this.snd));
        break;
      case this.operations.SUB:
        this.value = "" + ((+this.fst) - (+this.snd));
        break;
      case this.operations.MUL:
        this.value = "" + ((+this.fst) * (+this.snd));
        break;
      case this.operations.DIV:
        this.value = "" + ((+this.fst) / (+this.snd));
        break;
      case this.operations.NEG:
        this.value = "" + (-this.fst);
        break;
      case this.operations.SQT:
        this.value = "" + Math.sqrt(this.fst);
        break;
    }
    if (this.value == "NaN") {
      this.operation = this.operations.NOP;
      this.state = this.states.DEFAULT;
    }
		else if (this.value == "Infinity") {
			this.value = '\u221E';
			this.operation = this.operations.NOP;
      this.state = this.states.DEFAULT;
		}
		else {
			this.value = +parseFloat(this.value).toFixed(10);
		}
  };

  operBtn(val) {
    switch (val) {
      case this.operations.ADD:
      case this.operations.SUB:
      case this.operations.MUL:
      case this.operations.DIV:
        if (this.state != this.states.READ_SND) {
					this.operation = val;
          this.fst = +this.value;
          this.state = this.states.READ_SND;
          this.clear();
        } else {
          this.snd = +this.value;
          this.processOP();
					this.operation = val;
          this.fst = +this.value;
          this.clear();
        }
        break;

      case this.operations.NEG:
				this.value = "" + (-this.value);
        break;

      case this.operations.SQT:
				this.operation = val;
        this.fst = +this.value;
        this.processOP();
        this.state = this.states.DEFAULT;
        break;

      case this.operations.NOP:
				this.operation = val;
        break;

      default:
        break;
    }
  }

  eqBtn() {
    if (this.state == this.states.DEFAULT) {
			this.fst = +this.value;
      this.processOP();
    } else if (this.state == this.states.READ_SND) {
      this.snd = +this.value;
      this.processOP();
    }
    this.state = this.states.DEFAULT;
  }
}

mresize = function() {
	const w_h = 0.75;
	const mgn = 0.6;

	var vw = $(window).width();
	var vh = $(window).height();

	var h = vh * mgn;
	var w = vw * mgn;

	if (w_h * h <= w) {
		w = w_h * h;
	} else {
		h = w / w_h;
	}

	var t = (vh - h) / 2.0;
	var l = (vw - w) / 2.0;

	var font = Math.round(h / 15);

	$("#calc").css("width", w);
	$("#calc").css("height", h);
	$("#calc").css("margin-left", l);
	$("#calc").css("margin-top", t);
	$("#calc").css("font-size", font	);
};

$(document).ready(mresize);
$(window).resize(mresize);

switchColor = function(elm){
	var t = $(elm).css("caret-color");
	$(elm).css("caret-color", $(elm).css("background-color"));
	$(elm).css("background-color", t);
};

var calc = new Calculator();

processMD = function(elm) {
	var eId = $(elm).attr("id");

	switch (eId) {
		case "clr":
			calc.clear();
			break;
	  case "neg":
			calc.operBtn(calc.operations.NEG);
		  break;
		case "sqrt":
			calc.operBtn(calc.operations.SQT);
			break;
	  case "add":
			calc.operBtn(calc.operations.ADD);
		  break;
		case "sub":
			calc.operBtn(calc.operations.SUB);
			break;
	  case "mul":
			calc.operBtn(calc.operations.MUL);
		  break;
		case "div":
			calc.operBtn(calc.operations.DIV);
			break;
	  case "eq":
		  calc.eqBtn();
		  break;
		case "dot":
			calc.numBtn('.');
		default:
			calc.numBtn(eId);
	}
	$("#calc-input").val(calc.value);
};

$(function() {
	var isMouseDown = false;

	$(".calc-button").mousedown(function() {
		if (!isMouseDown){
			switchColor(this);
			processMD(this);
		}
		isMouseDown = true;
	});
	$(".calc-button").mouseup(function() {
		if (isMouseDown)
			switchColor(this);
		isMouseDown = false;
	});
	$(".calc-button").mouseleave(function() {
		if (isMouseDown)
			switchColor(this);
		isMouseDown = false;
	});
});
