import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';

function description2array(val) {
  val = val.toUpperCase()
  const reg = /^(.+) (P|LT|T)?(\d+(\.\d+)?)\/(\d+(\.\d+)?) ([VZ]?R|-)?(\d+)(C?) ((\d+)(\/(\d+))?) ?(\w) ?(.*)$/i
  const match = reg.exec(val);
  var result = {}
  if (match) {
    result.description = match[0];
    result.product = match[1];
    result.type = match[2];
    result.width = match[3];
    result.series = match[5];
    result.radial = match[7];
    result.rim = match[8];
    result.load_index1 = match[11];
    result.load_index2 = match[13];
    result.speed_index = match[14];
    result.extra = match[15];
  }
  const new_result = extra2array(result.extra, result);

  let brand = val.containsAny(brands)
  if (brand) {
    result.brand = brand;
    result.product = result.product.replace(brand, "")
  }
  return new_result;
}


const brands = [
  "ACCELERA",
  "ACHILLES",
  "AEOLUS",
  "ALLIANCE",
  "AOTELI",
  "APLUS",
  "APOLLO",
  "ATLAS",
  "AURORA",
  "AUSTONE",
  "AVON",
  "BARUM",
  "BFGOODRICH",
  "BF-GOODRICH",
  "BKT",
  "BRIDGESTONE",
  "CACHLAND",
  "CAMAC",
  "COMPASAL",
  "CONTINENTAL",
  "COOPER",
  "CORDIANT",
  "CST",
  "CULTOR",
  "DAYTON",
  "DEBICA",
  "DELI",
  "DELINTE",
  "DUNLOP",
  "DURATURN",
  "DURO",
  "FALKEN",
  "FEDERAL",
  "FIREMAX",
  "FIRESTONE",
  "FORMULA",
  "FORTUNA",
  "FORTUNE",
  "FULDA",
  "GENERAL",
  "GISLAVED",
  "GOODRIDE",
  "GOODYEAR",
  "GRIPMAX",
  "GT",
  "GT-RADIAL",
  "HAIDA",
  "HANKOOK",
  "HEADWAY",
  "HEIDENAU",
  "HI-FLY",
  "IMPERIAL",
  "INFINITY",
  "INSA-TURBO",
  "INTERSTATE",
  "JINYU",
  "JOYROAD",
  "KAMA",
  "KELLY",
  "KENDA",
  "KETER",
  "KINFOREST",
  "KING-MEILER",
  "KINGSTAR",
  "KLEBER",
  "KORMORAN",
  "KUMHO",
  "LANDSAIL",
  "LANVIGATOR",
  "LAUFENN",
  "LEXANI",
  "LINGLONG",
  "MARSHAL",
  "MASTERSTEEL",
  "MATADOR",
  "MAXTREK",
  "MAXXIS",
  "MENTOR",
  "METEOR",
  "METZELER",
  "MICHELIN",
  "MICHELIN-COLLECTION",
  "MILESTONE",
  "MINERVA",
  "MITAS",
  "NANKANG",
  "NEXEN",
  "NO-BRAND-IMAGE",
  "NOKIAN",
  "NORAUTO",
  "OTANI",
  "OVATION",
  "PACE",
  "PETLAS",
  "PIRELLI",
  "PNEUMANT",
  "POWERTRAC",
  "RADAR",
  "RETRO",
  "RIKEN",
  "ROTALLA",
  "ROTEX",
  "ROYAL",
  "ROYAL BLACK",
  "RUNWAY",
  "SAILUN",
  "SATOYA",
  "SAVA",
  "SEIBERLING",
  "SEMPERIT",
  "SONAR",
  "STARMAXX",
  "STAR-PERFORMER",
  "STRIAL",
  "SUNNY",
  "SYRON",
  "TAURUS",
  "T BY ZENISES",
  "THREE A",
  "TIGAR",
  "TOLEDO",
  "TOMKET",
  "TORQUE",
  "TOYO",
  "TRACMAX",
  "TRIANGLE",
  "TRISTAR",
  "UNIROYAL",
  "VIKING",
  "VITOUR",
  "VOLTYRE",
  "VREDESTEIN",
  "WANLI",
  "WINRUN",
  "WINTER-TACT",
  "YOKOHAMA",
  "ZETA"
  ]

const product = [

]
String.prototype.containsAny = String.prototype.containsAny || function(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (this.includes(arr[i])) {
      return arr[i];
    }
  }
  return null;
};

function extra2array(val, result) {
  // https://www.oponeo.co.uk/tyre-article/how-to-read-tyre-markings
  const regs = [
    {reg: /\b(ar)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(am)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(ao)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(aoe)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(r01)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(b)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(ece|e)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(jbl)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(k0)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k2)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k3)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(l)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(lr)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(jlr)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(jls)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mc)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mgt)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mgt j)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mo)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(moe)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mo1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(j)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n0)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n2)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n3)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n4)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n5)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(n6)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(nr1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /(retread|rinnovati|rinnovato)/i, key:"retread", action: "set", value:"true"},
    {reg: /\b(rwl|e)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(rbl)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(t0)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t2)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t3)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(tl|tt)\b/i, key:"tube", action: "push", index:1},
    {reg: /\b(twi)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(ulw)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(vol)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /(\*)/, key:"oe_marks", action: "push", index:1},
    {reg: /\b(xl|rf)\b/i, key:"extra_load", action: "set", index:1},
    {reg: /\b(mfs|fsl|rfp|fp|fr)\b/i, key:"mfs", action: "set", index:1},
    {reg: /\b(csr|dsst|emt|rsc|rof|runflat|rft|ssr|sst|zp)\b/i, key:"runflat", action: "set", index:1},
    {reg: /\b(run flat)\b/i, key:"runflat", action: "set", index:1},
    {reg: /\b(m\\+s)\b/i, key:"season", action: "set", value: "winter"},
    {reg: /\b(winter|summer|inverno|estate|all seasons)\b/i, key:"season", action: "set", index:1}
  ];
  regs.forEach(function(element) {
    let match = element.reg.exec(val);
    if (match) {
      let value = (element.value === undefined) ? match[element.index] : element.value;
      if (result[element.key] === undefined && element.action === "push") {
            result[element.key] = []
      }
      if (element.action === "push") {
        result[element.key].push(value);
      } else {
        result[element.key] = value;
      }
    }
   });
  return result;
}

class App extends Component {
  //state = {users: []}

  constructor(props) {
    super(props);
    this.state = {users: [], tyre: {}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + convert(this.state.value));
    this.setState({ tyre: description2array(this.state.value), users: this.state.users });
    //ga('send', 'event', 'Tyres', 'parse_description', '{this.state.tyre.description}');
    event.preventDefault();
  }
  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users, tyre: this.state.tyre }));
  }

  render() {
    return (


      <div className="App">
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/tyre/">Tyre Description Parser</a>
              </Navbar.Brand>
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>

          <h1>Tyre description Parser</h1>
          <p>Insert a string like <i>Goodyear EfficientGrip Performance 205&#47;55 R16 91V</i></p>
              <form onSubmit={this.handleSubmit}>
                  <input type="text" size="50" placeholder="insert a tire descrition..  " value={this.state.value} onChange={this.handleChange} />
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>


      </Grid>
    </Jumbotron>
      <ul>
      {Object.keys(this.state.tyre).map(k =>
        <li> {k}: {this.state.tyre[k]}</li>
      )}

      </ul>


  </div>


    );
  }
}

export default App;
