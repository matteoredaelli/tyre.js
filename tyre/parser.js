"use strict";


exports.parse_description = function(description) {
  const reg = /^(.+) (P|LT|T)?(\d+(\.\d+)?)\/(\d+(\.\d+)?) ([VZ]?R|-)?(\d+)(C?) ((\d+)(\/(\d+))?)(\w) ?(.*)$/i
  const match = reg.exec(description);
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

  return new_result;
}

function extra2array(val, result) {
  // https://www.oponeo.co.uk/tyre-article/how-to-read-tyre-markings
  // https://www.mytyres.co.uk/tyre-glossary.html
  const regs = [
    {reg: /\bGRNX|Eco-?impact\b/i, key:"green", action: "set", value: true},
    {reg: /\b(xl|rf)\b/i, key:"extra_load", action: "set", index:1},
    {reg: /\b(front|rear)\b/i, key:"front_rear", action: "push", index:1},
    {reg: /\b(mfs|fsl|rfp|fp|fr)\b/i, key:"mfs", action: "set", index:1},
    {reg: /\b(ece|e)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(jbl)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(rwl|e)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(twi)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(ulw)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(rbl)\b/i, key:"markings", action: "push", index:1},
    {reg: /\b(ar)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(am)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(ao)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(aoe)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(r01)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(b)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k0)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k2)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(k3)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(l)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(lr)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(jlr)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(jls)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mc)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(mclaren)\b/i, key:"oe_marks", action: "push", index:1},
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
    {reg: /\b(t0)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t1)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t2)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(t3)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /\b(vol)\b/i, key:"oe_marks", action: "push", index:1},
    {reg: /(\*)/, key:"oe_marks", action: "push", index:1},
    {reg: /\b(csr|dsst|emt|rsc|rof|runflat|rft|ssr|sst|zp)\b/i, key:"runflat", action: "set", index:1},
    {reg: /\b(run flat)\b/i, key:"runflat", action: "set", index:1},
    {reg: /\b(s-i|sealing|cs)\b/i, key:"seal_inside", action: "set", value: true},
    {reg: /\b(m\\+s|snow)\b/i, key:"season", action: "set", value: "winter"},
    {reg: /\b(winter|summer)\b/i, key:"season", action: "set", index:1},

    {reg: /\bSEASON|STAGIONI|4MEVSIM|JOKASÄÄNRENGAS|Celoročné\b/i, key:"season", action: "set", value: "all_seasons"},
    {reg: /\bm\\+s|snow|invernal|KITKARENGAS|NASTARENGAS|Zimné\b/i, key:"season", action: "set", value: "winter"},
    {reg: /\bSUMMER|ESTIV|KESÄRENGAS|Letné\b/i, key:"season", action: "set", value: "summer"},

    {reg: /\b(studded|chiodat|NASTARENGAS|SPIKE)\b/i, key:"studded", action: "set", value: true},
    {reg: /\b(studdable|chiodabil)\b/i, key:"studdable", action: "set", value: true},
    {reg: /\b(tl|tt)\b/i, key:"tube", action: "push", index:1},
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
