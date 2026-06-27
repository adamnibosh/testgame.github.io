/* MATH NEXUS — Question Bank v3.0 */
window.MATH_NEXUS = window.MATH_NEXUS || {};

MATH_NEXUS.QUESTIONS = {
  logarithms: [
    { q: "What is log₁₀(1000)?", o: ["2", "3", "4", "1"], a: "3", hint: "10³ = 1000", xp: 10 },
    { q: "If log₂(x) = 5, what is x?", o: ["32", "10", "25", "64"], a: "32", hint: "2⁵ = 32", xp: 15 },
    { q: "Simplify: log₃(81)", o: ["4", "3", "2", "5"], a: "4", hint: "3⁴ = 81", xp: 10 },
    { q: "logₐ(a⁷) = ?", o: ["1", "a", "7", "a⁷"], a: "7", hint: "Inverse property", xp: 10 },
    { q: "log₁₀(0.01) = ?", o: ["-2", "2", "-1", "0.01"], a: "-2", hint: "10⁻² = 0.01", xp: 20 },
    { q: "log₅(125) = ?", o: ["2", "3", "4", "5"], a: "3", hint: "5³ = 125", xp: 10 },
    { q: "ln(e⁴) = ?", o: ["1", "e", "4", "e⁴"], a: "4", hint: "Natural log of eⁿ is n", xp: 15 },
    { q: "log₂(1/8) = ?", o: ["-3", "3", "-2", "1/8"], a: "-3", hint: "2⁻³ = 1/8", xp: 20 },
    { q: "If log(x) = 2, x = ?", o: ["10", "100", "1000", "20"], a: "100", hint: "log₁₀ base assumed", xp: 15 },
    { q: "log₄(2) = ?", o: ["1/2", "2", "1/4", "4"], a: "1/2", hint: "4^(1/2) = 2", xp: 25 }
  ],
  algebra: [
    { q: "Solve: 2x + 6 = 14", o: ["4", "3", "5", "8"], a: "4", hint: "Subtract 6, divide by 2", xp: 10 },
    { q: "Factor: x² − 9", o: ["(x−3)(x+3)", "(x−9)(x+1)", "(x−3)²", "x(x−9)"], a: "(x−3)(x+3)", hint: "Difference of squares", xp: 15 },
    { q: "Simplify: (3x²)(2x³)", o: ["6x⁵", "5x⁵", "6x⁶", "5x⁶"], a: "6x⁵", hint: "Multiply coefficients & exponents", xp: 10 },
    { q: "If f(x) = 2x + 1, f(3) = ?", o: ["7", "6", "5", "8"], a: "7", hint: "Substitute x = 3", xp: 10 },
    { q: "Quadratic roots of x² − 5x + 6 = 0?", o: ["2 and 3", "1 and 6", "−2 and −3", "5 and 6"], a: "2 and 3", hint: "(x−2)(x−3)", xp: 20 },
    { q: "|−7| + |3| = ?", o: ["10", "4", "−4", "−10"], a: "10", hint: "Absolute values are positive", xp: 10 },
    { q: "Slope of y = −3x + 2?", o: ["−3", "3", "2", "−2"], a: "−3", hint: "y = mx + b form", xp: 10 },
    { q: "√(144) = ?", o: ["12", "14", "11", "72"], a: "12", hint: "12 × 12 = 144", xp: 10 },
    { q: "3⁴ = ?", o: ["81", "27", "64", "12"], a: "81", hint: "3 × 3 × 3 × 3", xp: 10 },
    { q: "Solve: x² = 49", o: ["±7", "7", "−7", "±49"], a: "±7", hint: "Square root both sides", xp: 15 }
  ],
  trigonometry: [
    { q: "sin(90°) = ?", o: ["1", "0", "−1", "0.5"], a: "1", hint: "Peak of sine wave", xp: 10 },
    { q: "cos(0°) = ?", o: ["1", "0", "−1", "0.5"], a: "1", hint: "Unit circle rightmost point", xp: 10 },
    { q: "tan(45°) = ?", o: ["1", "0", "√2", "√3"], a: "1", hint: "Opposite = adjacent", xp: 15 },
    { q: "sin²θ + cos²θ = ?", o: ["1", "0", "2", "sin(2θ)"], a: "1", hint: "Pythagorean identity", xp: 15 },
    { q: "sin(30°) = ?", o: ["1/2", "√3/2", "1", "√2/2"], a: "1/2", hint: "Special triangle", xp: 10 },
    { q: "cos(60°) = ?", o: ["1/2", "√3/2", "0", "1"], a: "1/2", hint: "Complement of 30°", xp: 10 },
    { q: "Period of y = sin(x)?", o: ["2π", "π", "π/2", "4π"], a: "2π", hint: "One full wave cycle", xp: 20 },
    { q: "cot(θ) = ?", o: ["1/tan(θ)", "tan(θ)", "1/sin(θ)", "cos(θ)/sin(θ)"], a: "1/tan(θ)", hint: "Reciprocal of tangent", xp: 15 },
    { q: "arcsin(1) = ?", o: ["90°", "0°", "45°", "180°"], a: "90°", hint: "sin(90°) = 1", xp: 20 },
    { q: "sec(θ) = ?", o: ["1/cos(θ)", "1/sin(θ)", "cos(θ)", "tan(θ)"], a: "1/cos(θ)", hint: "Reciprocal identity", xp: 15 }
  ],
  calculus: [
    { q: "d/dx(x³) = ?", o: ["3x²", "x²", "3x", "x³/3"], a: "3x²", hint: "Power rule", xp: 15 },
    { q: "∫ 2x dx = ?", o: ["x² + C", "2x² + C", "x + C", "2 + C"], a: "x² + C", hint: "Reverse power rule", xp: 15 },
    { q: "d/dx(sin x) = ?", o: ["cos x", "−cos x", "sin x", "−sin x"], a: "cos x", hint: "Classic derivative", xp: 15 },
    { q: "lim(x→0) sin(x)/x = ?", o: ["1", "0", "∞", "undefined"], a: "1", hint: "Famous limit", xp: 25 },
    { q: "d/dx(eˣ) = ?", o: ["eˣ", "xeˣ⁻¹", "ln(x)", "1"], a: "eˣ", hint: "eˣ is its own derivative", xp: 15 },
    { q: "∫ 1 dx = ?", o: ["x + C", "1 + C", "0", "x"], a: "x + C", hint: "Integral of constant 1", xp: 10 },
    { q: "d/dx(ln x) = ?", o: ["1/x", "x", "ln x", "eˣ"], a: "1/x", hint: "Log derivative", xp: 20 },
    { q: "f′(x) at a max/min point is often?", o: ["0", "1", "∞", "−1"], a: "0", hint: "Horizontal tangent", xp: 15 },
    { q: "∫₀¹ x dx = ?", o: ["1/2", "1", "0", "2"], a: "1/2", hint: "Area under y = x", xp: 20 },
    { q: "d/dx(cos x) = ?", o: ["−sin x", "sin x", "cos x", "−cos x"], a: "−sin x", hint: "Cosine derivative", xp: 15 }
  ],
  geometry: [
    { q: "Area of circle r = 5?", o: ["25π", "10π", "5π", "50π"], a: "25π", hint: "A = πr²", xp: 10 },
    { q: "Sum of triangle angles?", o: ["180°", "360°", "90°", "270°"], a: "180°", hint: "Euclidean geometry", xp: 10 },
    { q: "Pythagorean: 3-4-? triangle", o: ["5", "6", "7", "8"], a: "5", hint: "9 + 16 = 25", xp: 10 },
    { q: "Volume of cube side 3?", o: ["27", "9", "18", "6"], a: "27", hint: "s³", xp: 10 },
    { q: "Circumference r = 7?", o: ["14π", "7π", "49π", "28π"], a: "14π", hint: "C = 2πr", xp: 10 },
    { q: "Interior angles of pentagon?", o: ["540°", "360°", "720°", "450°"], a: "540°", hint: "(n−2)×180°", xp: 20 },
    { q: "Area of triangle b=6, h=4?", o: ["12", "24", "10", "20"], a: "12", hint: "½bh", xp: 10 },
    { q: "π ≈ ?", o: ["3.14159", "3.4159", "2.71828", "1.41421"], a: "3.14159", hint: "Circle constant", xp: 10 },
    { q: "Surface area of sphere r=2?", o: ["16π", "8π", "4π", "32π"], a: "16π", hint: "4πr²", xp: 20 },
    { q: "Diagonal of square side 1?", o: ["√2", "2", "1", "√3"], a: "√2", hint: "Pythagorean theorem", xp: 15 }
  ],
  statistics: [
    { q: "Mean of 2, 4, 6, 8?", o: ["5", "4", "6", "20"], a: "5", hint: "Sum ÷ count", xp: 10 },
    { q: "Median of 1, 3, 9?", o: ["3", "1", "9", "4.33"], a: "3", hint: "Middle value", xp: 10 },
    { q: "Probability of heads on fair coin?", o: ["1/2", "1/4", "1", "0"], a: "1/2", hint: "Two equally likely outcomes", xp: 10 },
    { q: "Standard deviation of constant set?", o: ["0", "1", "Mean", "Undefined"], a: "0", hint: "No spread", xp: 15 },
    { q: "P(A and B) if independent?", o: ["P(A)×P(B)", "P(A)+P(B)", "P(A)−P(B)", "1"], a: "P(A)×P(B)", hint: "Multiplication rule", xp: 20 },
    { q: "Mode of 2,2,5,7?", o: ["2", "5", "7", "4"], a: "2", hint: "Most frequent", xp: 10 },
    { q: "Variance measures?", o: ["Spread", "Center", "Skew", "Correlation"], a: "Spread", hint: "Dispersion from mean", xp: 15 },
    { q: "z-score formula uses?", o: ["(x−μ)/σ", "(x+μ)/σ", "x/σ", "μ/σ"], a: "(x−μ)/σ", hint: "Standardize", xp: 20 },
    { q: "Combinations: C(5,2) = ?", o: ["10", "20", "5", "25"], a: "10", hint: "5!/(2!3!)", xp: 20 },
    { q: "Correlation r = 1 means?", o: ["Perfect positive", "No relation", "Perfect negative", "Causal"], a: "Perfect positive", hint: "Linear fit", xp: 15 }
  ]
};

MATH_NEXUS.BOSS_QUESTIONS = [
  { q: "log₂(8) + log₃(27) = ?", o: ["6", "5", "9", "3"], a: "6", hint: "3 + 3", xp: 50, boss: true },
  { q: "∫₀^π sin(x) dx = ?", o: ["2", "0", "π", "1"], a: "2", hint: "−cos(x) from 0 to π", xp: 60, boss: true },
  { q: "If sin θ = 3/5, cos θ = ? (Q1)", o: ["4/5", "3/5", "5/4", "5/3"], a: "4/5", hint: "Pythagorean triple", xp: 50, boss: true },
  { q: "lim(x→∞) (1 + 1/x)^x = ?", o: ["e", "1", "∞", "0"], a: "e", hint: "Definition of e", xp: 75, boss: true },
  { q: "Derivative of x·ln(x) at x=1?", o: ["1", "0", "e", "ln(1)"], a: "1", hint: "Product rule", xp: 60, boss: true }
];

MATH_NEXUS.getPool = function (topic) {
  if (topic === "all") {
    return Object.values(MATH_NEXUS.QUESTIONS).flat();
  }
  if (topic === "boss") return MATH_NEXUS.BOSS_QUESTIONS.slice();
  return (MATH_NEXUS.QUESTIONS[topic] || MATH_NEXUS.QUESTIONS.logarithms).slice();
};

MATH_NEXUS.shuffle = function (arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};