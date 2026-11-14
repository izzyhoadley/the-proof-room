/*
 * The Proof Room: page logic.
 * Ported from the "Maths Site" design. Course data, lesson notes and quizzes live
 * here and in data/*.json; the markup is the template in index.html.
 */
const LESSONS = [
  ["Operations with vectors", "Adding, subtracting and scaling arrows in three components, plus what magnitude actually measures.", ["Notes", "Video"], "18 min"],
  ["Linear dependence and independence", "When does a third vector tell you something new, and when is it just the other two in a hat?", ["Notes", "Interactive"], "22 min"],
  ["Resolving vectors", "Splitting a vector into parts that point where you want them to point.", ["Notes", "Video", "Practice"], "16 min"],
  ["Scalar product and vector projections", "One number that knows the angle, and the shadow one vector casts on another.", ["Notes", "Video", "Interactive", "Practice"], "24 min"],
  ["Vector product", "A product that gives you back an arrow — and it is perpendicular to both.", ["Notes", "Video"], "20 min"],
  ["Parallel and perpendicular vectors", "Two quick tests, and how to tell at a glance which one to reach for.", ["Notes", "Practice"], "14 min"],
  ["Vector proofs of geometric results", "Proving the diagonals of a rhombus meet at right angles, without drawing a rhombus.", ["Notes", "Video", "Practice"], "26 min"]
];

const QUIZ = [
  {
    kicker: "Question 1",
    prompt: "Given a = 2i + 3j − k and b = 4i − j + 2k, what is a · b?",
    options: ["7", "13", "3", "−3"],
    correct: 2,
    right: "Yes. 8 − 3 − 2 = 3. Components multiplied pairwise, then added.",
    wrong: "Not quite. Multiply pairwise and add: (2)(4) + (3)(−1) + (−1)(2) = 8 − 3 − 2 = 3."
  },
  {
    kicker: "Question 2",
    prompt: "Two non-zero vectors have a scalar product of zero. What does that tell you?",
    options: ["They are parallel", "They are perpendicular", "They have equal magnitude", "One of them is a unit vector"],
    correct: 1,
    right: "Correct. cos θ = 0, so θ = 90°. Zero dot product is the perpendicularity test.",
    wrong: "Have another look. a · b = |a||b| cos θ, and neither magnitude is zero, so cos θ must be."
  },
  {
    kicker: "Question 3",
    prompt: "The scalar projection of a onto b comes out negative. What does the sign mean?",
    options: ["A calculation error — it cannot be negative", "b is longer than a", "The vectors are perpendicular", "The shadow points opposite to b, so the angle is obtuse"],
    correct: 3,
    right: "Exactly. Negative means θ > 90° and the projection points back along −b̂.",
    wrong: "The sign is real information: a negative scalar projection means the angle is obtuse and the shadow lies along −b̂."
  }
];

const TOPICS = [
 {
  "id": "proof",
  "strand": 0,
  "title": "Proof and Logic",
  "unit": "",
  "intro": "Quantifiers, conditional statements, contrapositive and contradiction, then telescoping series and proof by induction.",
  "lessons": [
   [
    "Revision of Proof",
    "Quantification · Negating quantifiers · Disproving statements · Divisibility · Conditional statements · Contrapositive · Contradiction · Equivalent statements",
    7,
    "Ex 3.3 Q4, 5, 7, 12, 14, 15, 21 · Ex 3.4 Q3, 5, 10, 11, 12, 14, 17"
   ],
   [
    "Telescoping Series",
    "",
    null,
    "See questions attached"
   ],
   [
    "Induction",
    "",
    null,
    "Ex 3.5 Q3, 4, 5, 6, 9, 10, 11, 16, 17, 18, 19"
   ],
   [
    "Exam Practice",
    "",
    null,
    "Submit in Term 1"
   ]
  ]
 },
 {
  "id": "algos",
  "strand": 0,
  "title": "Algorithms and Pseudocode",
  "unit": "",
  "intro": "Iteration, selection and pseudocode, building up to functions, lists, nested loops and Euler's method.",
  "lessons": [
   [
    "Algorithms",
    "What are algorithms? · Iteration and selection · Pseudocode · Functions · Lists · Nested loops · Euler's method",
    12,
    ""
   ]
  ]
 },
 {
  "id": "complex",
  "strand": 0,
  "title": "Complex Numbers",
  "unit": "Unit 4",
  "intro": "From i and the Argand diagram, through polar form and De Moivre's theorem, to complex roots and solving polynomial equations.",
  "lessons": [
   [
    "Complex Numbers",
    "The imaginary number i · Complex numbers · The Argand diagram · Multiplication · Complex conjugates · Addition of two squares · Modulus · Division",
    8,
    "Ex 4.1 Q1−10 (eso), 13−18"
   ],
   [
    "Polar Form I",
    "Polar form of a complex number · Multiplication and division in polar form",
    4,
    "Ex 4.2 Q3−6, 15−20"
   ],
   [
    "Polar Form II – Regions",
    "Distance between complex numbers · Circles · Perpendicular bisectors · Rays · Ellipses",
    4,
    "Ex 4.2 Q7−11, 13, 14, 22, 28, 31, 32"
   ],
   [
    "De Moivre's Theorem",
    "De Moivre's theorem",
    4,
    "Ex 4.3 Q3−13"
   ],
   [
    "Roots of Unity",
    "The nth roots of unity · General complex roots",
    4,
    "Ex 4.4 all"
   ],
   [
    "Factorising Polynomials",
    "The fundamental theorem of algebra · Factorising quadratics with complex roots · The conjugate root theorem · The factor theorem",
    3,
    "Ex 4.5 Q1−9 (eso), 10, 12"
   ],
   [
    "Solving Polynomials",
    "Quadratic equations · Cubic equations · Quartic equations",
    3,
    "Ex 4.6 Q3−8 (eso), 10, 11, 17, 19"
   ]
  ]
 },
 {
  "id": "circular",
  "strand": 1,
  "title": "Circular Functions",
  "unit": "",
  "intro": "Reciprocal circular functions, the Pythagorean identities, double angle formulas and the inverse circular functions.",
  "lessons": [
   [
    "The Reciprocal Functions",
    "The reciprocal functions · Exact values · The Pythagorean identities",
    4,
    "Ex 2.6 Q3, 4, 7, 8, 10, 13"
   ],
   [
    "Compound Angle Formulas",
    "Double angle formulas",
    4,
    "Ex 2.7 Q1, 2, 3, 4, 5, 7, 11, 12, 18, 21"
   ],
   [
    "Inverse Functions",
    "Restricting domains so arcsin, arccos and arctan exist",
    3,
    "Ex 2.8 Q3, 5, 6, 9, 10, 12, 24, 25"
   ]
  ]
 },
 {
  "id": "rational",
  "strand": 1,
  "title": "Rational Functions",
  "unit": "",
  "intro": "Conic sections, rational and reciprocal functions, their asymptotes, and absolute value functions.",
  "lessons": [
   [
    "Conic Sections",
    "Circles · Ellipses · Hyperbolas",
    7,
    "Ex 2.1 Q4, 5, 8, 9, 10, 11, 12, 13, 14"
   ],
   [
    "Rational Functions",
    "Features of rational functions · Review of partial fractions",
    6,
    "Ex 2.2 Q3, 4−10 (eso), 11−16"
   ],
   [
    "Sketching Rational Functions",
    "Reciprocal functions · Simple rational functions",
    5,
    "Ex 2.3 Q3−7 (eso), 9, 10, 11"
   ],
   [
    "Quotient Functions",
    "Horizontal asymptotes · Oblique asymptotes · Curved asymptotes",
    3,
    "Ex 2.4 Q3−6 (eso), 7, 8, 10, 15"
   ],
   [
    "Exam Questions",
    "Finding rules from asymptotes · Intercepts · Stationary points",
    7,
    "Working lesson"
   ],
   [
    "Absolute Value Functions",
    "Graphs of y = |f(x)| · Solving absolute value equations and inequalities",
    7,
    "Ex 2.5 Q3−11"
   ]
  ]
 },
 {
  "id": "diff",
  "strand": 2,
  "title": "Differentiation",
  "unit": "",
  "intro": "Derivatives of circular, inverse circular, exponential and logarithmic functions, then second derivatives, related rates and implicit differentiation.",
  "lessons": [
   [
    "Differentiation",
    "Differentiation rules · Standard derivatives",
    4,
    "Ex 5.1 all"
   ],
   [
    "Circular Functions",
    "Derivative of tan · Derivatives of sec, csc and cot",
    4,
    "Ex 5.2 all"
   ],
   [
    "Inverse Circular Functions",
    "Derivatives of inverse functions · arcsin · arccos · arctan",
    5,
    "Ex 5.3 all"
   ],
   [
    "Exponential and Logarithmic Functions",
    "Derivative of aˣ · Derivative of logₐ(x)",
    4,
    "Ex 5.4 all"
   ],
   [
    "Second Derivatives",
    "A function, its derivative and its second derivative",
    4,
    "Ex 5.5 Q3−10, 12, 14, 18, 19−21"
   ],
   [
    "Points of Inflection",
    "Stationary points, concavity and the second derivative",
    4,
    "Ex 5.6 all"
   ],
   [
    "Related Rates",
    "Related rates · Parametric equations",
    6,
    "Ex 5.7 all"
   ],
   [
    "Implicit Differentiation",
    "Differentiating curves that cannot be written as y = f(x)",
    4,
    "Ex 5.8 all"
   ]
  ]
 },
 {
  "id": "integ",
  "strand": 2,
  "title": "Integration",
  "unit": "",
  "intro": "Standard integrals, substitution, products of circular functions, partial fractions, recognition and integration by parts.",
  "lessons": [
   [
    "Anti-Differentiation",
    "Standard results · The definite integral",
    2,
    "Ex 7.1 all"
   ],
   [
    "Integrals – Inverse Circular Functions",
    "Definite integrals · Completing the square",
    5,
    "Ex 7.2 Q3−9, 10, 12, 14, 15, 17"
   ],
   [
    "Integration by Substitution",
    "Indefinite integration · Linear substitution · Definite integration",
    5,
    "Ex 7.3 Q3−8, 9, 12, 14, 20"
   ],
   [
    "Integrating Circular Functions",
    "Products of sines and cosines · Products to sums",
    4,
    "Ex 7.4 Q3−8, 9, 14, 16"
   ],
   [
    "Integrating using Partial Fractions",
    "Two linear factors · Repeated linear factors · Definite integrals",
    4,
    "Ex 7.5 all"
   ],
   [
    "Further Techniques",
    "Integration by recognition · Splitting the numerator",
    4,
    "Ex 7.6 all"
   ],
   [
    "Integration by Parts",
    "Two-step integration by parts · Inverse circular functions · Exponential and circular products · Reduction formula",
    6,
    "Ex 7.7 all"
   ]
  ]
 },
 {
  "id": "apps",
  "strand": 2,
  "title": "Applications of Integration",
  "unit": "",
  "intro": "Areas, integral functions, volumes of solids of revolution, arc length and surface area.",
  "lessons": [
   [
    "Areas Under Curves",
    "The definite integral · Signed and unsigned area · Area between curves · Using technology",
    5,
    "Ex 8.1 Q1−6, 8, 10, 12, 15"
   ],
   [
    "Graphs of Anti-Derivatives",
    "Sketching anti-derivative graphs · Defining a function as an integral",
    3,
    "Ex 8.2 all"
   ],
   [
    "Volumes of Revolution",
    "Cylindrical shells · Solids of revolution · Regions not bounded by the axis",
    4,
    "Ex 8.3 Q3−9, 14, 19, 22, 26"
   ],
   [
    "Arc Lengths of Curves",
    "Derivation of the arc length formula · Length of a curve",
    4,
    "Ex 8.4 Q3−9, 12, 16, 18"
   ],
   [
    "Surface Areas of Revolution",
    "Surface area of revolution · Parametric form",
    4,
    "Ex 8.5 Q3−10, 13"
   ]
  ]
 },
 {
  "id": "diffeq",
  "strand": 2,
  "title": "Differential Equations",
  "unit": "",
  "intro": "Verifying and solving differential equations, modelling with them, the logistic model, slope fields and Euler's method.",
  "lessons": [
   [
    "Differential Equations",
    "Order and degree · Verifying a solution to a differential equation",
    3,
    "Ex 9.1 Q2−13"
   ],
   [
    "Diff Eqns in terms of x",
    "Solving by anti-differentiating once",
    3,
    "Ex 9.2 Q3−14, 21"
   ],
   [
    "Second Order Differential Equations",
    "Solving by anti-differentiating twice",
    3,
    "Ex 9.3 Q3−11, 17, 18"
   ],
   [
    "Diff Eqns in terms of y",
    "Newton's law of cooling · Growth and decay · Inflow/outflow",
    4,
    "Ex 9.4 Q3−8, 10, 22, 23, 25, 29"
   ],
   [
    "Separation of Variables",
    "The logistic model",
    3,
    "Ex 9.5 Q3−12"
   ],
   [
    "Slope Fields",
    "Reading a family of solutions from gradient segments",
    2,
    "Ex 9.6 Q3, 4, 5, 6, 9, 10, 12, 13, 16"
   ],
   [
    "Euler's Method",
    "Numerical solutions to differential equations",
    3,
    "Ex 9.7 Q3−10, 13, 15, 18"
   ]
  ]
 },
 {
  "id": "kin",
  "strand": 2,
  "title": "Kinematics and Vector Functions",
  "unit": "",
  "intro": "Rectilinear motion, velocity–time graphs and constant acceleration, then vector functions and vector calculus for motion along a curve.",
  "lessons": [
   [
    "Straight-Line Motion",
    "Definitions",
    3,
    "Ex 10.1 Q1−7, 9, 11, 15, 18, 22"
   ],
   [
    "Velocity-Time Graphs",
    "Gradient, signed area and total area",
    3,
    "Ex 10.2 Q3−12, 18"
   ],
   [
    "SUVAT Equations",
    "The SUVAT equations",
    3,
    "Ex 10.3 Q3−9, 13, 16, 20"
   ],
   [
    "Variable Acceleration",
    "Velocity and acceleration as functions of time or displacement",
    4,
    "Ex 10.4 Q3−10, 17, 19"
   ],
   [
    "Position Vectors",
    "Position vectors as functions of time · Parametric, vector and Cartesian equations",
    4,
    "Ex 11.1 all"
   ],
   [
    "Vector Calculus",
    "Differentiating and integrating vector functions",
    4,
    "Ex 11.2 Q3−12, 14, 15"
   ],
   [
    "Applying Vectors to Motion",
    "Velocity and acceleration vectors",
    4,
    "Ex 11.3 Q3−10, 14, 16"
   ]
  ]
 },
 {
  "id": "vec3d",
  "strand": 3,
  "title": "Vectors in 3D",
  "unit": "Unit 3",
  "intro": "Operations on vectors in three dimensions, resolving, the scalar and vector products, parallel and perpendicular vectors, and linear dependence.",
  "lessons": [
   [
    "Operations with Vectors",
    "Representing vectors · Position and unit vectors · Adding and subtracting · Scalar multiplication · Magnitude",
    6,
    "Ex 1.1 all"
   ],
   [
    "Resolving Vectors",
    "Component form · Vectors from magnitude and angle (2D) · Angles with coordinate axes (3D)",
    4,
    "Ex 1.3 all"
   ],
   [
    "Scalar (Dot) Product and Projections",
    "The dot product · Geometric interpretation · Properties · Angle between two vectors · Scalar and vector projections",
    6,
    "Ex 1.4 Q3, 4, 5, 9, 10, 11, 12, 15, 16, 19, 21, 22"
   ],
   [
    "Vector (Cross) Product",
    "The vector product formula · Determinant form · Properties · Magnitude of the cross product",
    4,
    "Ex 1.5 all"
   ],
   [
    "Parallel and Perpendicular Vectors",
    "Key results · Collinear points · Concurrent vectors",
    4,
    "Ex 1.6 all"
   ],
   [
    "Linear Dependence of Vectors",
    "Linear dependence · Linear independence · Special case: two vectors",
    4,
    "Ex 1.2 all"
   ]
  ]
 },
 {
  "id": "veceq",
  "strand": 3,
  "title": "Vector Equations",
  "unit": "Unit 3",
  "intro": "Vector equations of curves, lines and planes, the cross product, and distances and angles between lines and planes.",
  "lessons": [
   [
    "Curves in 2D and 3D",
    "Vector equations of curves · Vector to Cartesian form (2D) · Describing 3D curves · Projections onto coordinate planes",
    6,
    "Ex 6.1 all"
   ],
   [
    "Vector Equation of a Line",
    "Position and displacement vectors · Vector equation of a line · Parametric form · Cartesian form · Line segments",
    5,
    "Ex 6.2 Q3−10 (eso), 13, 15, 16"
   ],
   [
    "Normals to a Plane",
    "Cross product formula · Finding a normal to a plane · Normal to a plane using three points",
    3,
    "Ex 6.3 all"
   ],
   [
    "Vector Equations of Planes",
    "From a normal and a point · From three points · Checking if a point lies on a plane · Parallel planes · Summary",
    6,
    "Ex 6.4 Q3−7, 9, 10, 11, 13, 14"
   ],
   [
    "Distances, Intersections and Angles",
    "Point to plane · Intersections and angles · Between parallel planes · Between skew lines",
    6,
    "Worksheet"
   ]
  ]
 },
 {
  "id": "random",
  "strand": 4,
  "title": "Random Variables and Hypothesis Testing",
  "unit": "Unit 4",
  "intro": "Linear combinations of random variables, the normal distribution, sample means, confidence intervals and hypothesis testing.",
  "lessons": [
   [
    "Linear Combinations",
    "Y = aX + b · Sums of independent random variables",
    4,
    "Ex 12.1 Q1−10, 16, 17, 18"
   ],
   [
    "Independent Normal Random Variables",
    "X ~ N(μ, σ²) · The standard normal distribution",
    3,
    "Ex 12.2 Q3−11, 19"
   ],
   [
    "Sample Means",
    "The sample mean as a random variable",
    4,
    "Worksheet"
   ],
   [
    "Confidence Intervals",
    "Point estimates · Interval estimates",
    4,
    "Ex 12.4 Q3−9, 14, 16, 18, 20"
   ],
   [
    "Hypothesis Testing",
    "Null and alternative hypotheses",
    4,
    "Ex 12.5 Q3−10, 11, 23, 25"
   ],
   [
    "Errors in Hypothesis Testing",
    "Errors in hypothesis testing",
    3,
    "Ex 12.6 all"
   ]
  ]
 }
];
const EXAM = {
 "proof": {
  "patterns": [
   [
    "Induction on a divisibility or parity statement, worth 3 marks with no calculator.",
    "VCAA NHT 2026 · Exam 1 Q2"
   ],
   [
    "Choosing the contrapositive from four plausible sentences. The converse and inverse are always among the wrong options.",
    "VCAA NHT 2026 · Exam 2 A1"
   ]
  ],
  "marks": "3 marks",
  "q": "Prove by mathematical induction that 7ⁿ − 1 is divisible by 6 for all n ∈ N.",
  "steps": [
   "Base case: when n = 1, 7¹ − 1 = 6, which is divisible by 6.",
   "Assume true for n = k: 7ᵏ − 1 = 6m for some m ∈ Z.",
   "Then 7ᵏ⁺¹ − 1 = 7 · 7ᵏ − 1 = 7(6m + 1) − 1 = 42m + 6 = 6(7m + 1).",
   "So the statement holds for n = k + 1. True for n = 1 and true for k ⇒ true for k + 1, so it is true for all n ∈ N."
  ],
  "trap": "Write the assumption as an equation with an integer m. \"Assume 7ᵏ − 1 is divisible by 6\" on its own gives you nothing to substitute."
 },
 "algos": {
  "patterns": [
   [
    "Tracing a while loop that sums small strips to approximate an area or surface area.",
    "VCAA NHT 2026 · Exam 2 A3"
   ],
   [
    "Euler's method is on the formula sheet as a recurrence — expect it written as a loop.",
    "Formula sheet"
   ]
  ],
  "marks": "1 mark",
  "q": "x ← 0, y ← 1, h ← 0.5. While x < 1: y ← y + h × (x + y), then x ← x + h. End while. Print y. What is printed?",
  "steps": [
   "Pass 1 (x = 0): y = 1 + 0.5 × (0 + 1) = 1.5, then x = 0.5.",
   "Check: 0.5 < 1, so loop again.",
   "Pass 2 (x = 0.5): y = 1.5 + 0.5 × (0.5 + 1.5) = 2.5, then x = 1.",
   "Check: 1 < 1 is false, so the loop ends. Printed value: 2.5."
  ],
  "trap": "Off-by-one errors. Check the condition with the updated x before every pass, and notice < versus ≤."
 },
 "complex": {
  "patterns": [
   [
    "Maximum or minimum |z| for z on a circle: distance from the origin to the centre, plus or minus the radius.",
    "VCAA NHT 2026 · Exam 2 A5"
   ],
   [
    "A real-coefficient polynomial with a given complex root. Use the conjugate root theorem to get a quadratic factor.",
    "VCAA NHT 2026 · Exam 1 Q10"
   ],
   [
    "Matching a shaded Argand region to |z| and Arg(z) inequalities.",
    "VCAA NHT 2026 · Exam 2 A6"
   ]
  ],
  "marks": "2 marks",
  "q": "The point z lies on the circle |z − 3 − 4i| = 2. Find the maximum and minimum values of |z|.",
  "steps": [
   "|z| is the distance from the origin to z.",
   "The centre 3 + 4i is √(3² + 4²) = 5 from the origin, and 5 > 2, so the origin is outside the circle.",
   "Max |z| = 5 + 2 = 7, min |z| = 5 − 2 = 3."
  ],
  "trap": "Check whether the origin is inside the circle before subtracting. If it is, the minimum is radius − distance."
 },
 "circular": {
  "patterns": [
   [
    "Piecewise functions involving arctan, where you choose a constant to make the function continuous.",
    "VCAA NHT 2026 · Exam 2 A2"
   ],
   [
    "Reciprocal circular functions inside calculus, e.g. a curve with y = sec(t) and a given gradient.",
    "VCAA NHT 2026 · Exam 2 A8"
   ]
  ],
  "marks": "2 marks",
  "q": "Find the exact value of sin(2 arctan(3/4)).",
  "steps": [
   "Let θ = arctan(3/4), so tan θ = 3/4 with θ ∈ (−π/2, π/2). Here θ is in the first quadrant.",
   "A 3–4–5 triangle gives sin θ = 3/5 and cos θ = 4/5.",
   "sin 2θ = 2 sin θ cos θ = 2 × 3/5 × 4/5 = 24/25."
  ],
  "trap": "Use the range of the inverse function to fix the quadrant. With arctan of a negative number, sin θ is negative."
 },
 "rational": {
  "patterns": [
   [
    "Long division to find an oblique or parabolic asymptote, then sketching with intercepts labelled.",
    "VCAA NHT 2026 · Exam 1 Q9"
   ],
   [
    "Finding the parameter value that removes an asymptote, usually because a factor cancels.",
    "VCAA NHT 2026 · Exam 2 B1 f–g"
   ]
  ],
  "marks": "3 marks",
  "q": "Find the oblique asymptote of f(x) = (x² + 3x + 1)/(x + 1). For what value of k does g(x) = (x² + 3x + k)/(x + 1) have no vertical asymptote?",
  "steps": [
   "Divide: x² + 3x + 1 = (x + 1)(x + 2) − 1, so f(x) = x + 2 − 1/(x + 1).",
   "Oblique asymptote: y = x + 2.",
   "For g, the vertical asymptote disappears when x + 1 is a factor of the numerator: (−1)² + 3(−1) + k = 0, so k = 2.",
   "Then g(x) = x + 2 with a hole at (−1, 1) — not an asymptote."
  ],
  "trap": "When the factor cancels, the graph has a point of discontinuity. Show it as an open circle."
 },
 "diff": {
  "patterns": [
   [
    "Points of inflection where f″(x) = 0 — you must check that the sign changes.",
    "VCAA NHT 2026 · Exam 1 Q3"
   ],
   [
    "Parametric curves: vertical tangents where dx/dt = 0, and matching a given gradient.",
    "VCAA NHT 2026 · Exam 1 Q7, VCAA NHT 2026 · Exam 2 A8"
   ]
  ],
  "marks": "3 marks",
  "q": "Find the x-coordinate(s) of any points of inflection of f(x) = x⁵ − 5x⁴.",
  "steps": [
   "f′(x) = 5x⁴ − 20x³, f″(x) = 20x³ − 60x² = 20x²(x − 3).",
   "f″(x) = 0 at x = 0 and x = 3.",
   "Around x = 0, 20x² ≥ 0 and (x − 3) < 0, so f″ is negative on both sides. No sign change, so no inflection.",
   "Around x = 3, f″ changes from negative to positive. Inflection at x = 3 only."
  ],
  "trap": "A repeated factor in f″ means no change of concavity. Listing every root of f″ = 0 loses the mark."
 },
 "integ": {
  "patterns": [
   [
    "Integration by parts with a logarithm, followed by an initial condition to find c.",
    "VCAA NHT 2026 · Exam 1 Q8"
   ],
   [
    "A substitution that changes the terminals — the answer is written in terms of u.",
    "VCAA NHT 2026 · Exam 2 A9"
   ]
  ],
  "marks": "3 marks",
  "q": "Find ∫ x³ logₑ(x) dx.",
  "steps": [
   "Let u = logₑ(x) and dv/dx = x³, so du/dx = 1/x and v = x⁴/4.",
   "∫ x³ logₑ(x) dx = (x⁴/4) logₑ(x) − ∫ (x⁴/4)(1/x) dx.",
   "= (x⁴/4) logₑ(x) − ∫ x³/4 dx = (x⁴/4) logₑ(x) − x⁴/16 + c."
  ],
  "trap": "Choose the logarithm as u. Choosing it as dv/dx means integrating logₑ(x), which needs parts again."
 },
 "apps": {
  "patterns": [
   [
    "Volume of a solid formed by rotating the region between two curves.",
    "VCAA NHT 2026 · Exam 1 Q4b, VCAA NHT 2026 · Exam 2 B3b"
   ],
   [
    "Setting up arc length and surface area integrals, often parametric.",
    "VCAA NHT 2026 · Exam 2 A10, B3c–d"
   ]
  ],
  "marks": "3 marks",
  "q": "The region between y = eˣ and y = 1 for 0 ≤ x ≤ 1 is rotated about the x-axis. Find the exact volume.",
  "steps": [
   "Outer radius eˣ, inner radius 1: V = π ∫₀¹ (e²ˣ − 1) dx.",
   "= π [e²ˣ/2 − x]₀¹ = π (e²/2 − 1 − 1/2).",
   "V = π(e² − 3)/2."
  ],
  "trap": "Subtract the squares, π∫(y₁² − y₂²) dx, not π∫(y₁ − y₂)² dx."
 },
 "diffeq": {
  "patterns": [
   [
    "Logistic equations: write the time taken as a definite integral in P.",
    "VCAA NHT 2026 · Exam 2 A12"
   ],
   [
    "Matching a direction field to its differential equation.",
    "VCAA NHT 2026 · Exam 2 A7"
   ],
   [
    "Showing y = eᵐˣ solves a second-order equation by substituting.",
    "VCAA NHT 2026 · Exam 1 Q4a"
   ]
  ],
  "marks": "3 marks",
  "q": "dP/dt = 0.1P(1 − P/500), with P(0) = 50. Find the time taken for P to reach 250.",
  "steps": [
   "Invert: dt/dP = 1 / (0.1P(1 − P/500)) = 5000 / (P(500 − P)).",
   "T = ∫₅₀²⁵⁰ 5000 / (P(500 − P)) dP.",
   "Partial fractions: 5000 / (P(500 − P)) = 10(1/P + 1/(500 − P)).",
   "T = 10[logₑ(P / (500 − P))]₅₀²⁵⁰ = 10(logₑ1 − logₑ(1/9)) = 10 logₑ 9 ≈ 22.0."
  ],
  "trap": "The terminals are values of P (50 to 250), not times."
 },
 "kin": {
  "patterns": [
   [
    "Acceleration given in terms of v — use v dv/dx for displacement, dv/dt for time.",
    "VCAA NHT 2026 · Exam 2 A14"
   ],
   [
    "Counting changes of direction from x(t): velocity must change sign.",
    "VCAA NHT 2026 · Exam 2 A13"
   ],
   [
    "Constant-acceleration problems with no calculator.",
    "VCAA NHT 2026 · Exam 1 Q1"
   ]
  ],
  "marks": "2 marks",
  "q": "A particle has acceleration a = 1 + v, where v is its velocity. It starts at the origin from rest. Find its displacement when v = 2.",
  "steps": [
   "Displacement is wanted, so use a = v dv/dx: v dv/dx = 1 + v.",
   "dx/dv = v / (1 + v) = 1 − 1/(1 + v).",
   "x = ∫₀² (1 − 1/(1 + v)) dv = [v − logₑ(1 + v)]₀² = 2 − logₑ 3."
  ],
  "trap": "Using dv/dt here gives the time, not the displacement. Read what the question asks for first."
 },
 "vec3d": {
  "patterns": [
   [
    "Scalar resolute with an unknown component — solve a·b̂ = k.",
    "VCAA NHT 2026 · Exam 2 A15"
   ],
   [
    "Acute angle between two planes from their normals.",
    "VCAA NHT 2026 · Exam 1 Q11, VCAA NHT 2026 · Exam 2 A18"
   ],
   [
    "Area of a triangle with ½|AB × AC|.",
    "VCAA NHT 2026 · Exam 2 B5a"
   ]
  ],
  "marks": "2 marks",
  "q": "The scalar resolute of a = 2i + pj − k in the direction of b = i + 2j + 2k is 3. Find p.",
  "steps": [
   "|b| = √(1 + 4 + 4) = 3, so b̂ = (i + 2j + 2k)/3.",
   "a · b̂ = (2 + 2p − 2)/3 = 2p/3.",
   "2p/3 = 3, so p = 9/2."
  ],
  "trap": "The scalar resolute uses the unit vector. Using a · b = 3 gives p = 3/2."
 },
 "veceq": {
  "patterns": [
   [
    "Line of intersection of two planes, often given as multiple choice.",
    "VCAA NHT 2026 · Exam 2 A19"
   ],
   [
    "Distance between parallel planes, including finding a constant that gives a set distance.",
    "VCAA NHT 2026 · Exam 2 B5c"
   ],
   [
    "Angle between planes with a parameter — remember there are two possible values.",
    "VCAA NHT 2026 · Exam 1 Q11"
   ]
  ],
  "marks": "2 marks",
  "q": "Find the distance between the parallel planes 2x − y + 2z = 5 and 4x − 2y + 4z = 1.",
  "steps": [
   "Scale the second plane so the normals match: 2x − y + 2z = 1/2.",
   "|n| = √(4 + 1 + 4) = 3.",
   "D = |5 − 1/2| / 3 = (9/2)/3 = 3/2."
  ],
  "trap": "The |d₁ − d₂| / |n| formula only works once both equations have the same normal vector."
 },
 "random": {
  "patterns": [
   [
    "Difference of two independent observations, X₁ − X₂, compared with the mean of a sample.",
    "VCAA NHT 2026 · Exam 2 B6a–b"
   ],
   [
    "Working back from a confidence interval to the sample size n.",
    "VCAA NHT 2026 · Exam 1 Q6"
   ],
   [
    "p values, then the probability of a Type II error once the true mean is known.",
    "VCAA NHT 2026 · Exam 2 B6d–e"
   ]
  ],
  "marks": "2 marks",
  "q": "Times are normally distributed with mean 60 s and standard deviation 4 s, independently. Find the probability that two times differ by less than 3 s.",
  "steps": [
   "Let D = X₁ − X₂. E(D) = 0 and Var(D) = 16 + 16 = 32.",
   "Pr(|D| < 3) = Pr(−3 < D < 3) with D ~ N(0, 32).",
   "= Pr(|Z| < 3/√32) = Pr(|Z| < 0.530) ≈ 0.404."
  ],
  "trap": "Variances add even when the variables are subtracted. Also, X₁ − X₂ is not the same as 2X, which has variance 4σ²."
 }
};
const VEC_LESSONS = {"0":{"intro":[{"t":"A "},{"b":"vector"},{"t":" is defined as having a "},{"b":"magnitude"},{"t":" (size) and a "},{"b":"direction"},{"t":". Vectors are used to represent quantities such as position, velocity, acceleration and forces."}],"blocks":[{"h":"Representing Vectors"},{"p":[{"t":"The vector "},{"m":"\\overrightarrow{AB}"},{"t":" is a line of magnitude "},{"m":"|\\overrightarrow{AB}|"},{"t":" and direction starting at "},{"m":"A"},{"t":" and finishing at "},{"m":"B"},{"t":"."}]},{"p":[{"t":"A vector can also be expressed with:"}]},{"list":[[{"t":"The tilde symbol, e.g. "},{"m":"\\utilde{a}"}],[{"t":"Bold notation, e.g. "},{"b":"a"}],[{"t":"Column matrix notation, e.g. "},{"m":"\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}"}],[{"t":"Component form, e.g. "},{"m":"x\\utilde{i} + y\\utilde{j} + z\\utilde{k}"}]],"ordered":false},{"h":"Position Vectors and Unit Vectors"},{"p":[{"t":"Vectors can be written with reference to a certain point, usually the origin, "},{"m":"O"},{"t":"."}]},{"p":[{"m":"\\utilde{i}"},{"t":" is the "},{"b":"unit vector"},{"t":" in the "},{"m":"x"},{"t":" direction."}]},{"p":[{"m":"\\utilde{j}"},{"t":" is the "},{"b":"unit vector"},{"t":" in the "},{"m":"y"},{"t":" direction."}]},{"p":[{"m":"\\utilde{k}"},{"t":" is the "},{"b":"unit vector"},{"t":" in the "},{"m":"z"},{"t":" direction."}]},{"fig":true},{"p":[{"t":"The position vector "},{"m":"x\\utilde{i} + y\\utilde{j} + z\\utilde{k}"},{"t":" can also be written as "},{"m":"\\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}"},{"t":"."}]},{"h":"Adding and Subtracting Vectors"},{"p":[{"t":"We "},{"b":"add"},{"t":" vectors by placing them ‘head to tail’."}]},{"p":[{"t":"In this diagram, "},{"m":"\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}"},{"t":"."}]},{"fig":true},{"p":[{"t":"We "},{"b":"subtract"},{"t":" vectors by reversing the direction of the vector that is subtracted."}]},{"p":[{"m":"\\overrightarrow{AB} - \\overrightarrow{BC} = \\overrightarrow{AB} + \\overrightarrow{CB}"}]},{"h":"Scalar Multiplication"},{"p":[{"t":"Multiplication by a real number (scalar) changes the "},{"b":"magnitude"},{"t":", but not the direction, of the vector."}]},{"p":[{"t":"Consider the vector "},{"m":"\\utilde{u} = \\utilde{i} + \\utilde{j}"},{"t":"."}]},{"list":[[{"m":"2\\utilde{u}"},{"t":" is twice the length of "},{"m":"\\utilde{u}"}],[{"m":"\\dfrac{1}{2}\\utilde{u}"},{"t":" is half the length of "},{"m":"\\utilde{u}"}],[{"m":"-2\\utilde{u}"},{"t":" has double the length, but in the "},{"b":"opposite direction"}]],"ordered":false},{"h":"Magnitude of a Vector"},{"p":[{"t":"The magnitude (or length) of a vector "},{"m":"\\utilde{a} = x\\utilde{i} + y\\utilde{j} + z\\utilde{k}"},{"t":" is:"}]},{"f":"|\\utilde{a}| = \\sqrt{x^2 + y^2 + z^2}"},{"h":"Unit Vectors"},{"p":[{"t":"A "},{"b":"unit vector"},{"t":" has a magnitude of 1. The unit vector in the direction of "},{"m":"\\utilde{a}"},{"t":" is denoted "},{"m":"\\hat{a}"},{"t":" (pronounced “a-hat”)."}]},{"f":"\\hat{a} = \\dfrac{\\utilde{a}}{|\\utilde{a}|}"}],"examples":[[{"p":[{"t":"Consider the three position vectors: "},{"m":"\\utilde{a} = 2\\utilde{i} + 3\\utilde{j}"},{"t":", "},{"m":"\\utilde{b} = \\utilde{i} - 4\\utilde{j}"},{"t":", "},{"m":"\\utilde{c} = -3\\utilde{i} + \\utilde{j}"},{"t":"."}]},{"p":[{"t":"Find:"}]},{"list":[[{"m":"\\utilde{a} + \\utilde{b}"}],[{"m":"\\utilde{b} + 2\\utilde{c}"}],[{"m":"3\\utilde{a} - \\utilde{b} + \\utilde{c}"}]],"ordered":true,"lettered":true}],[{"p":[{"t":"Find the magnitude of the vector "},{"m":"\\utilde{a} = -3\\utilde{i} + 2\\utilde{j} + 4\\utilde{k}"},{"t":"."}]}],[{"p":[{"t":"Find the unit vector "},{"m":"\\hat{b}"},{"t":", where "},{"m":"\\utilde{b} = -2\\utilde{i} + \\utilde{j} + 2\\utilde{k}"},{"t":"."}]}],[{"p":[{"t":"Given "},{"m":"\\overrightarrow{OA} = 4\\utilde{i} + 2\\utilde{j} - 3\\utilde{k}"},{"t":" and "},{"m":"\\overrightarrow{OB} = 5\\utilde{i} - \\utilde{j} + 6\\utilde{k}"},{"t":", find:"}]},{"list":[[{"m":"\\overrightarrow{AB}"}],[{"t":"the unit vector in the direction of "},{"m":"\\overrightarrow{AB}"}]],"ordered":true,"lettered":true}],[{"p":[{"t":"For the trapezium shown, if "},{"m":"\\overrightarrow{AB} = \\dfrac{2}{3}\\overrightarrow{DC}"},{"t":", express "},{"m":"\\overrightarrow{AB}"},{"t":" in terms of "},{"m":"\\utilde{c}"},{"t":" and "},{"m":"\\utilde{d}"},{"t":", where "},{"m":"\\overrightarrow{OC} = \\utilde{c}"},{"t":" and "},{"m":"\\overrightarrow{OD} = \\utilde{d}"},{"t":"."}]},{"fig":true}],[{"p":[{"t":"For the given diagram of a regular hexagon, express "},{"m":"\\overrightarrow{AB}"},{"t":" in terms of "},{"m":"\\utilde{e}"},{"t":" and "},{"m":"\\utilde{d}"},{"t":", where "},{"m":"\\overrightarrow{OE} = \\utilde{e}"},{"t":" and "},{"m":"\\overrightarrow{OD} = \\utilde{d}"},{"t":"."}]},{"fig":true}]]},"1":{"intro":[{"t":"The process of writing a vector as a linear combination of vectors in particular directions is called "},{"b":"resolution"},{"t":"."}],"blocks":[{"p":[{"b":"Orthogonal components"},{"t":" are at right angles to each other. To represent a vector in space, we resolve the vector along the three mutually perpendicular axes."}]},{"h":"Component Form"},{"p":[{"t":"The vector "},{"m":"\\overrightarrow{OM}"},{"t":" can be represented as "},{"m":"\\overrightarrow{OM} = x\\utilde{i} + y\\utilde{j} + z\\utilde{k}"},{"t":". This is known as the "},{"b":"component form"},{"t":" of a vector."}]},{"p":[{"t":"It is easy to write a vector in component form if we know the beginning and endpoints of the vector."}]},{"h":"Vectors from Magnitude and Angle (2D)"},{"p":[{"t":"Consider a vector "},{"m":"\\overrightarrow{OA}"},{"t":" of length "},{"m":"r"},{"t":" units at an angle of "},{"m":"\\theta"},{"t":" to the positive "},{"m":"x"},{"t":"-axis. Using trigonometry:"}]},{"f":"\\overrightarrow{OA} = (r\\cos\\theta)\\utilde{i} + (r\\sin\\theta)\\utilde{j}"},{"h":"Angles with Coordinate Axes (3D)"},{"p":[{"t":"Given the vector "},{"m":"\\utilde{a} = a_1\\utilde{i} + a_2\\utilde{j} + a_3\\utilde{k}"},{"t":" makes angles "},{"m":"\\alpha"},{"t":", "},{"m":"\\beta"},{"t":", "},{"m":"\\gamma"},{"t":" to the positive directions of the "},{"m":"x"},{"t":", "},{"m":"y"},{"t":" and "},{"m":"z"},{"t":" axes respectively, then:"}]},{"f":"\\cos(\\alpha) = \\dfrac{a_1}{|\\utilde{a}|} \\qquad \\cos(\\beta) = \\dfrac{a_2}{|\\utilde{a}|} \\qquad \\cos(\\gamma) = \\dfrac{a_3}{|\\utilde{a}|}"}],"examples":[[{"p":[{"t":"Write the vector "},{"m":"\\overrightarrow{OM}"},{"t":" in component form given the points "},{"m":"O(0, 0, 0)"},{"t":" and "},{"m":"M(-2, 3, -5)"},{"t":"."}]}],[{"p":[{"t":"Write the vector "},{"m":"\\overrightarrow{AB}"},{"t":" in component form given the points "},{"m":"A(1, 2, -5)"},{"t":" and "},{"m":"B(-1, 3, -8)"},{"t":"."}]}],[{"p":[{"t":"Write a vector of magnitude 10 units at an angle of "},{"m":"\\dfrac{\\pi}{3}"},{"t":" to the "},{"m":"y"},{"t":"-axis in 2D component form."}]}],[{"p":[{"t":"Let "},{"m":"\\utilde{b} = \\utilde{i} - \\utilde{j} + 2\\utilde{k}"},{"t":". Find:"}]},{"list":[[{"t":"its magnitude"}],[{"t":"the angle the vector makes with the "},{"m":"x"},{"t":", "},{"m":"y"},{"t":" and "},{"m":"z"},{"t":" axes, respectively. Write your answers to the nearest degree."}]],"ordered":true,"lettered":true}]]},"2":{"intro":[{"t":"The operation of multiplying two vectors has two methods. The "},{"b":"dot product"},{"t":" (or "},{"b":"scalar product"},{"t":") produces a scalar result."}]},"3":{"intro":[{"t":"The "},{"b":"vector product"},{"t":" (or "},{"b":"cross product"},{"t":") of two vectors in 3D space produces a vector result."}],"blocks":[{"p":[{"t":"The vector product of two vectors is a vector at "},{"b":"right angles to both"},{"t":" the original vectors. Its magnitude is the product of the magnitudes of the original vectors and the sine of the angle between their directions."}]},{"h":"The Vector Product Formula"},{"p":[{"t":"If "},{"m":"\\utilde{a} = a_1\\utilde{i} + a_2\\utilde{j} + a_3\\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = b_1\\utilde{i} + b_2\\utilde{j} + b_3\\utilde{k}"},{"t":", then:"}]},{"f":"\\utilde{a} \\times \\utilde{b} = (a_2b_3 - a_3b_2)\\utilde{i} - (a_1b_3 - a_3b_1)\\utilde{j} + (a_1b_2 - a_2b_1)\\utilde{k}"},{"h":"Determinant Form"},{"recall":true,"r1":[{"t":"In Unit 1 you found the determinant of a "},{"m":"3 \\times 3"},{"t":" matrix by expanding along the first row:"}],"rf":"\\det\\begin{bmatrix} p & q & r \\\\ s & t & u \\\\ v & w & x \\end{bmatrix} = p\\begin{vmatrix} t & u \\\\ w & x \\end{vmatrix} - q\\begin{vmatrix} s & u \\\\ v & x \\end{vmatrix} + r\\begin{vmatrix} s & t \\\\ v & w \\end{vmatrix}","r2":[{"t":"Each entry in the top row multiplies the "},{"m":"2 \\times 2"},{"t":" determinant left after covering its row and column, with signs alternating "},{"m":"+\\;-\\;+"},{"t":". The cross product uses exactly this expansion, with "},{"m":"\\utilde{i}, \\utilde{j}, \\utilde{k}"},{"t":" in the top row and the components of "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":" in the rows below. The minus sign on the "},{"m":"\\utilde{j}"},{"t":" term is the middle sign of "},{"m":"+\\;-\\;+"},{"t":"."}]},{"p":[{"t":"The vector product can be expressed using determinants:"}]},{"f":"\\utilde{a} \\times \\utilde{b} = \\begin{vmatrix} \\utilde{i} & \\utilde{j} & \\utilde{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = \\begin{vmatrix} a_2 & a_3 \\\\ b_2 & b_3 \\end{vmatrix}\\utilde{i} - \\begin{vmatrix} a_1 & a_3 \\\\ b_1 & b_3 \\end{vmatrix}\\utilde{j} + \\begin{vmatrix} a_1 & a_2 \\\\ b_1 & b_2 \\end{vmatrix}\\utilde{k}"},{"p":[{"t":"where "},{"m":"\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc"},{"t":"."}]},{"h":"Properties of the Vector Product"},{"list":[[{"m":"\\utilde{a} \\times \\utilde{b} = -(\\utilde{b} \\times \\utilde{a})"},{"t":" (anti-commutative)"}],[{"m":"\\utilde{a} \\times \\utilde{a} = \\utilde{0}"},{"t":" (a vector crossed with itself is the zero vector)"}],[{"m":"\\utilde{i} \\times \\utilde{j} = \\utilde{k}"},{"t":", "},{"m":"\\utilde{j} \\times \\utilde{k} = \\utilde{i}"},{"t":", "},{"m":"\\utilde{k} \\times \\utilde{i} = \\utilde{j}"}]],"ordered":true,"lettered":false},{"h":"Magnitude of the Cross Product"},{"p":[{"t":"The magnitude of the vector product is:"}]},{"f":"|\\utilde{a} \\times \\utilde{b}| = |\\utilde{a}||\\utilde{b}|\\sin(\\theta)"},{"p":[{"t":"where "},{"m":"\\theta"},{"t":" is the angle between the two vectors."}]},{"p":[{"t":"The magnitude of the cross product equals the "},{"b":"area of the parallelogram"},{"t":" formed by vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":"."}]},{"fig":true}],"examples":[[{"p":[{"t":"Find the vector product of the vectors "},{"m":"\\utilde{a} = 3\\utilde{i} + 2\\utilde{j} - \\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = \\utilde{i} + 2\\utilde{k}"},{"t":"."}]}],[{"p":[{"t":"Find the vector product of "},{"m":"\\utilde{a} = \\begin{bmatrix} 3 \\\\ -3 \\\\ 1 \\end{bmatrix}"},{"t":" and "},{"m":"\\utilde{b} = \\begin{bmatrix} 4 \\\\ 9 \\\\ 2 \\end{bmatrix}"},{"t":"."}]}],[{"p":[{"t":"Find the area of the parallelogram formed by vectors "},{"m":"\\utilde{a} = 3\\utilde{i} + 3\\utilde{j} + 8\\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = \\utilde{i} - 3\\utilde{j} + 2\\utilde{k}"},{"t":"."}]}],[{"p":[{"t":"Find the area of the triangle with vertices "},{"m":"A(1,0,2)"},{"t":", "},{"m":"B(3,-1,4)"},{"t":" and "},{"m":"C(0,2,1)"},{"t":"."}]}]]},"4":{"intro":[{"t":"Three important results come from the scalar product:"}],"blocks":[{"h":"Key Results"},{"list":[[{"t":"If "},{"m":"\\utilde{a} \\cdot \\utilde{b} = 0"},{"t":", then vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":" are "},{"b":"perpendicular"},{"t":"."}],[{"t":"If "},{"m":"\\utilde{a} \\cdot \\utilde{b} = |\\utilde{a}||\\utilde{b}|"},{"t":", then vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":" are "},{"b":"parallel in the same direction"},{"t":"."}],[{"t":"If "},{"m":"\\utilde{a} \\cdot \\utilde{b} = -|\\utilde{a}||\\utilde{b}|"},{"t":", then vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":" are "},{"b":"parallel in the opposite direction"},{"t":"."}]],"ordered":false},{"h":"Collinear Points"},{"p":[{"t":"If three or more points lie on the same line, they are said to be "},{"b":"collinear"},{"t":"."}]},{"p":[{"t":"Points "},{"m":"A"},{"t":", "},{"m":"B"},{"t":", and "},{"m":"C"},{"t":" are collinear if "},{"m":"\\overrightarrow{AB}"},{"t":" is parallel to "},{"m":"\\overrightarrow{AC}"},{"t":", i.e. "},{"m":"\\overrightarrow{AB} = k\\overrightarrow{AC}"},{"t":" for some scalar "},{"m":"k"},{"t":"."}]},{"h":"Concurrent Vectors"},{"p":[{"t":"If two or more vectors go through the same point, those vectors are said to be "},{"b":"concurrent"},{"t":"."}]}],"examples":[[{"p":[{"t":"Show that "},{"m":"\\utilde{a} = 3\\utilde{i} - 2\\utilde{j} + 4\\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = -2\\utilde{i} + 3\\utilde{j} + 3\\utilde{k}"},{"t":" are perpendicular."}]}],[{"p":[{"t":"Consider the vectors "},{"m":"\\utilde{a} = -3\\utilde{i} - \\utilde{j} + 2\\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = 2\\utilde{i} + \\utilde{j} - \\utilde{k}"},{"t":"."}]},{"list":[[{"t":"Find a unit vector that is parallel, and in the opposite direction, to "},{"m":"\\utilde{a}"},{"t":"."}],[{"t":"Find the unit vector that is perpendicular to "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":"."}]],"ordered":true,"lettered":true}],[{"p":[{"t":"Show that points "},{"m":"A(3, 2, 1)"},{"t":", "},{"m":"B(6, 5, 4)"},{"t":" and "},{"m":"C(-3, -4, -5)"},{"t":" are collinear."}]}],[{"p":[{"t":"Points "},{"m":"A(1, 1, 1)"},{"t":", "},{"m":"B(2, 0, -1)"},{"t":" and "},{"m":"C(x, y, z)"},{"t":" are collinear. Given that "},{"m":"|\\overrightarrow{AB}| : |\\overrightarrow{AC}| = 2:3"},{"t":", find "},{"m":"x"},{"t":", "},{"m":"y"},{"t":" and "},{"m":"z"},{"t":"."}]}]]},"5":{"intro":null,"blocks":[{"h":"Linear Dependence"},{"p":[{"t":"If vector "},{"m":"\\utilde{c}"},{"t":" can be written as a "},{"b":"linear combination"},{"t":" of vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":", then "},{"m":"\\utilde{a}"},{"t":", "},{"m":"\\utilde{b}"},{"t":" and "},{"m":"\\utilde{c}"},{"t":" are said to be "},{"b":"linearly dependent"},{"t":"."}]},{"p":[{"t":"This means that when "},{"m":"\\utilde{c} = m\\utilde{a} + n\\utilde{b}"},{"t":" for real numbers "},{"m":"m"},{"t":" and "},{"m":"n"},{"t":", where "},{"m":"m"},{"t":" and "},{"m":"n"},{"t":" are not both zero, then "},{"m":"\\utilde{a}"},{"t":", "},{"m":"\\utilde{b}"},{"t":" and "},{"m":"\\utilde{c}"},{"t":" are linearly dependent."}]},{"h":"Linear Independence"},{"p":[{"t":"Conversely, if vector "},{"m":"\\utilde{c}"},{"t":" "},{"b":"cannot"},{"t":" be written as a linear combination of vectors "},{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":", then "},{"m":"\\utilde{a}"},{"t":", "},{"m":"\\utilde{b}"},{"t":" and "},{"m":"\\utilde{c}"},{"t":" are said to be "},{"b":"linearly independent"},{"t":"."}]},{"p":[{"t":"A set of vectors is linearly independent if no vector can be expressed as a linear combination of the other vectors."}]},{"h":"Special Case: Two Vectors"},{"p":[{"t":"For two vectors, they are linearly dependent if and only if they are "},{"b":"parallel"},{"t":"."}]},{"p":[{"m":"\\utilde{a}"},{"t":" and "},{"m":"\\utilde{b}"},{"t":" are linearly dependent iff "},{"m":"\\utilde{a} = m\\utilde{b}"},{"t":", where "},{"m":"m"},{"t":" is a scalar."}]}],"examples":[[{"p":[{"t":"Determine whether the two vectors "},{"m":"\\utilde{a} = -3\\utilde{i} + \\utilde{j} - 3\\utilde{k}"},{"t":" and "},{"m":"\\utilde{b} = \\utilde{i} - \\dfrac{1}{3}\\utilde{j} + \\utilde{k}"},{"t":" are linearly dependent."}]}],[{"p":[{"t":"Consider the vectors "},{"m":"\\utilde{p} = -3\\utilde{i} + \\utilde{j} + 2\\utilde{k}"},{"t":", "},{"m":"\\utilde{q} = \\utilde{i} + \\utilde{j} + \\utilde{k}"},{"t":", and "},{"m":"\\utilde{s} = \\utilde{i} - 3\\utilde{j} + 3\\utilde{k}"},{"t":"."}]},{"p":[{"t":"Determine whether the three vectors are linearly dependent."}]}],[{"p":[{"t":"Determine whether the vectors "},{"m":"\\utilde{p} = \\begin{bmatrix} 1 \\\\ 1 \\\\ -1 \\end{bmatrix}"},{"t":", "},{"m":"\\utilde{q} = \\begin{bmatrix} 3 \\\\ -1 \\\\ 4 \\end{bmatrix}"},{"t":" and "},{"m":"\\utilde{r} = \\begin{bmatrix} 3 \\\\ -5 \\\\ 11 \\end{bmatrix}"},{"t":" are linearly dependent."}]}],[{"p":[{"t":"Find the value of "},{"m":"d"},{"t":" for which the vectors "},{"m":"\\utilde{a} = 2\\utilde{i} - 3\\utilde{j} + 4\\utilde{k}"},{"t":", "},{"m":"\\utilde{b} = -2\\utilde{i} + 4\\utilde{j} - 8\\utilde{k}"},{"t":" and "},{"m":"\\utilde{c} = -6\\utilde{i} + 2\\utilde{j} + d\\utilde{k}"},{"t":" are linearly dependent."}]}]]}};
const QUIZZES = {"0":[{"prompt":"Given a = 2i + 3j and b = i − 4j, what is a + b?","options":["3i + 7j","i + 7j","3i − j","2i − 12j"],"correct":2,"right":"Yes. Add the components: (2 + 1)i + (3 − 4)j = 3i − j.","wrong":"Add matching components: (2 + 1)i + (3 − 4)j = 3i − j."},{"prompt":"What is the magnitude of −3i + 4j?","options":["5","7","1","25"],"correct":0,"right":"Correct. √((−3)² + 4²) = √25 = 5.","wrong":"Square each component, add, then square root: √(9 + 16) = 5."},{"prompt":"What is the unit vector in the direction of 2i − j + 2k?","options":["(2i − j + 2k) / 9","(2i − j + 2k) / 5","2i − j + 2k","(2i − j + 2k) / 3"],"correct":3,"right":"Yes. The magnitude is √(4 + 1 + 4) = 3, so divide by 3.","wrong":"Divide by the magnitude, √(4 + 1 + 4) = 3, not by its square."},{"prompt":"OA = i + 2j and OB = 4i − j. What is AB?","options":["−3i + 3j","3i − 3j","5i + j","3i + j"],"correct":1,"right":"Correct. AB = OB − OA = (4 − 1)i + (−1 − 2)j.","wrong":"AB = OB − OA, so subtract A from B: (4 − 1)i + (−1 − 2)j = 3i − 3j."}],"1":[{"prompt":"Write OM in component form, where M is the point (−2, 3, −5).","options":["2i − 3j + 5k","−2i + 3j − 5k","−2i − 3j − 5k","3i − 2j − 5k"],"correct":1,"right":"Yes. The coordinates of M become the i, j and k components.","wrong":"From the origin, the coordinates of M are the components: −2i + 3j − 5k."},{"prompt":"A is (1, 2, −5) and B is (−1, 3, −8). What is AB?","options":["2i − j + 3k","−i + 3j − 8k","5j − 13k","−2i + j − 3k"],"correct":3,"right":"Correct. Subtract A from B: (−1 − 1)i + (3 − 2)j + (−8 + 5)k.","wrong":"AB = OB − OA: (−1 − 1)i + (3 − 2)j + (−8 − (−5))k = −2i + j − 3k."},{"prompt":"A vector has magnitude 4 and makes an angle of 30° with the positive x-axis. Which is it?","options":["2√3 i + 2j","2i + 2√3 j","4i + 4j","√3 i + j"],"correct":0,"right":"Yes. 4 cos 30° = 2√3 and 4 sin 30° = 2.","wrong":"Use (r cos θ)i + (r sin θ)j: 4 cos 30° = 2√3 and 4 sin 30° = 2."},{"prompt":"For a = 2i + 2j + k, what is the cosine of the angle a makes with the z-axis?","options":["1/9","1","1/3","2/3"],"correct":2,"right":"Correct. |a| = 3, so cos γ = a₃ / |a| = 1/3.","wrong":"cos γ = a₃ / |a|. Here |a| = √(4 + 4 + 1) = 3, so cos γ = 1/3."}],"2":null,"3":[{"prompt":"What is i × j?","options":["−k","i","0","k"],"correct":3,"right":"Yes. i × j = k, j × k = i, k × i = j.","wrong":"Going around i → j → k gives a positive result: i × j = k."},{"prompt":"What is a × a?","options":["|a|²","The zero vector","a","1"],"correct":1,"right":"Correct. A vector crossed with itself is the zero vector, since sin 0 = 0.","wrong":"The angle between a and itself is 0 and sin 0 = 0, so a × a is the zero vector. (|a|² is a · a.)"},{"prompt":"If a × b = 2i − j + 3k, what is b × a?","options":["2i − j + 3k","2i + j + 3k","−2i + j − 3k","The zero vector"],"correct":2,"right":"Yes. The vector product is anti-commutative: b × a = −(a × b).","wrong":"Swapping the order flips the sign: b × a = −(a × b) = −2i + j − 3k."},{"prompt":"What is the area of the parallelogram formed by a = 2i and b = 3j?","options":["6","5","3","12"],"correct":0,"right":"Correct. a × b = 6k, and |6k| = 6.","wrong":"Area = |a × b|. Here a × b = 6(i × j) = 6k, so the area is 6."}],"4":[{"prompt":"a = 2i + j and b = i − 2j. How are a and b related?","options":["Parallel, same direction","Perpendicular","Parallel, opposite direction","None of these"],"correct":1,"right":"Yes. a · b = 2 − 2 = 0, so they are perpendicular.","wrong":"Check the dot product: a · b = (2)(1) + (1)(−2) = 0, so they are perpendicular."},{"prompt":"For what value of m are 3i + mj − k and i + 2j + k perpendicular?","options":["1","−2","−1","2"],"correct":2,"right":"Correct. 3 + 2m − 1 = 0 gives m = −1.","wrong":"Set the dot product to zero: 3 + 2m − 1 = 0, so m = −1."},{"prompt":"If a · b = −|a||b|, then a and b are…","options":["parallel, in opposite directions","parallel, in the same direction","perpendicular","unit vectors"],"correct":0,"right":"Yes. cos θ = −1, so θ = 180°.","wrong":"a · b = |a||b| cos θ, so cos θ = −1 and θ = 180°: parallel, opposite directions."},{"prompt":"Points A, B and C are collinear when…","options":["AB · AC = 0","|AB| = |AC|","AB and AC are perpendicular","AB = k·AC for some scalar k"],"correct":3,"right":"Correct. AB and AC must be parallel, and they share the point A.","wrong":"Collinear means AB is parallel to AC, i.e. AB = k·AC for some scalar k."}],"5":[{"prompt":"Two vectors are linearly dependent if and only if they are…","options":["perpendicular","the same length","parallel","unit vectors"],"correct":2,"right":"Yes. For two vectors, dependence means one is a scalar multiple of the other.","wrong":"For two vectors, linearly dependent means a = mb, which means parallel."},{"prompt":"Are a = 2i − 4j + 6k and b = −i + 2j − 3k linearly dependent?","options":["No","Yes, a = 2b","You can't tell with only two vectors","Yes, a = −2b"],"correct":3,"right":"Correct. Each component of a is −2 times the matching component of b.","wrong":"Compare components: 2 = −2(−1), −4 = −2(2), 6 = −2(−3). So a = −2b and they are dependent."},{"prompt":"If c = 2a − 3b, then a, b and c are…","options":["linearly dependent","linearly independent","perpendicular","all parallel"],"correct":0,"right":"Yes. c is a linear combination of a and b.","wrong":"c is written as a linear combination of a and b, which is exactly what linear dependence means."},{"prompt":"Which set of vectors is linearly independent?","options":["i, 2i, j","i, j, k","i, j, i + j","i + j, 2i + 2j, k"],"correct":1,"right":"Correct. None of i, j, k can be written using the other two.","wrong":"In the other sets, one vector is a combination of the others (e.g. 2i = 2 × i). Only i, j, k is independent."}]};
const CONTENT = { proof: {"0":{"intro":null,"blocks":[{"h":"Quantification"},{"h3":"For all (∀)"},{"p":[{"t":"A "},{"b":"universal statement"},{"t":" claims that a property holds for all members of a given set. Such a statement can be written using the quantifier ‘for all’. For example:"}]},{"f":"\\begin{gathered} \\text{For all real numbers } x \\text{ and } y,\\ x^2 + 5y^2 \\geqslant 2xy \\\\ \\text{or} \\\\ \\forall x, y \\in \\mathbb{R}\\ (x^2 + 5y^2 \\geqslant 2xy) \\end{gathered}"},{"p":[{"t":"To prove this a general argument that applies for all choices of "},{"m":"x"},{"t":" and "},{"m":"y"},{"t":" is required."}]},{"h3":"There exists (∃)"},{"p":[{"t":"An "},{"b":"existence statement"},{"t":" claims that a property holds for at least one member of a given set. Such a statement can be written using the quantifier ‘there exists’. For example:"}]},{"f":"\\begin{gathered} \\text{There exists a triple of integers } a, b, c \\text{ such that } a^2 + b^2 = c^2 \\\\ \\text{or} \\\\ \\exists\\, a, b, c \\in \\mathbb{Z}\\ (a^2 + b^2 = c^2) \\end{gathered}"},{"p":[{"t":"To prove that this statement is true, we just need to give one instance."}]},{"h":"Negation of Quantifiers"},{"p":[{"t":"When negating a statement with a quantifier, the quantifiers must also change."}]},{"list":[[{"t":"‘There exists’ becomes ‘For all’"}],[{"t":"‘For all’ becomes ‘There exists’"}]],"ordered":false},{"h":"Disproving Statements"},{"p":[{"t":"To disprove:"}]},{"list":[[{"t":"a universal statement, a single "},{"b":"counterexample"},{"t":" is required"}],[{"t":"an existence statement, a proof of the negation is required (which is a universal statement)"}]],"ordered":false},{"h":"Conditional Statements"},{"f":"P \\implies Q \\quad (P \\text{ implies } Q)"},{"p":[{"m":"P"},{"t":" is the "},{"b":"hypothesis"},{"t":", "},{"m":"Q"},{"t":" is the "},{"b":"conclusion"},{"t":". Assume "},{"m":"P"},{"t":" to be true in order to prove."}]},{"h":"Contrapositive"},{"p":[{"t":"Remember the contrapositive statement is true if the statement is true."}]},{"p":[{"t":"The contrapositive of "},{"m":"P \\implies Q"},{"t":" is "},{"m":"\\neg Q \\implies \\neg P"},{"t":"."}]},{"h":"Contradiction"},{"p":[{"t":"The basic outline of a proof by contradiction is:"}]},{"list":[[{"t":"Assume that the statement we want to prove is false."}],[{"t":"Show that this assumption leads to mathematical nonsense."}],[{"t":"Conclude that we were wrong to assume that the statement is false."}],[{"t":"Conclude that the statement must be true."}]],"ordered":true,"lettered":false},{"h":"Equivalent Statements"},{"f":"P \\iff Q"},{"p":[{"t":"It can also be said that "},{"m":"P"},{"t":" is true "},{"b":"if and only if"},{"t":" "},{"m":"Q"},{"t":" is true."}]},{"p":[{"t":"This statement states "},{"m":"P \\implies Q"},{"t":" and "},{"m":"Q \\implies P"},{"t":". To prove an equivalence, both statements must be proven."}]},{"h":"Alternative Statements"},{"f":"\\begin{array}{lll} \\textbf{Name} & \\textbf{Symbol} & \\textbf{Value} \\\\ \\hline \\text{Implication} & P \\implies Q & \\text{Assume True} \\\\ \\text{Converse} & Q \\implies P & \\text{False} \\\\ \\text{Inverse} & \\neg P \\implies \\neg Q & \\text{False} \\\\ \\text{Contrapositive} & \\neg Q \\implies \\neg P & \\text{True} \\\\ \\text{Negation} & \\neg(P \\implies Q) = P \\wedge \\neg Q & \\text{True} \\end{array}"}],"examples":[{"label":"Example 1.1 · Negation","parts":[{"p":[{"t":"Write down the negation of each of the following statements:"}]},{"list":[[{"t":"For all natural numbers "},{"m":"n"},{"t":", we have "},{"m":"2^n \\geqslant n + 1"}],[{"t":"There exists an integer "},{"m":"m"},{"t":" such that "},{"m":"m^2 = 4"},{"t":" and "},{"m":"m^3 = 8"}],[{"t":"For all real numbers "},{"m":"x"},{"t":" and "},{"m":"y"},{"t":", if "},{"m":"x < y"},{"t":", then "},{"m":"x^2 < y^2"}]],"ordered":true,"lettered":true},{"p":[{"t":"Hint: "},{"m":"\\neg(P \\implies Q) = P \\wedge \\neg Q"}]}]},{"label":"Example 1.2 · Disproving","parts":[{"p":[{"t":"Disprove the following:"}]},{"list":[[{"t":"For all real numbers "},{"m":"n"},{"t":", "},{"m":"n^2"},{"t":" is either a multiple of 2 or 3."}],[{"t":"There exists a natural number "},{"m":"n"},{"t":" such that "},{"m":"n^2 + 3n + 2"},{"t":" is odd."}]],"ordered":true,"lettered":true}]},{"label":"Example 1.3 · Divisibility","parts":[{"p":[{"t":"Let "},{"m":"n \\in \\mathbb{Z}"},{"t":", prove that "},{"m":"n^3 - n"},{"t":" is divisible by 3."}]}]},{"label":"Example 1.4 · Conditional statements","parts":[{"p":[{"t":"Prove that if "},{"m":"n"},{"t":" is odd, "},{"m":"n^2 - 1"},{"t":" is divisible by 4."}]}]},{"label":"Example 1.5 · Contrapositive","parts":[{"p":[{"t":"Let "},{"m":"n \\in \\mathbb{Z}"},{"t":", prove that if "},{"m":"n^2 + 2n"},{"t":" is odd, then "},{"m":"n"},{"t":" is odd."}]}]},{"label":"Example 1.6 · Contradiction","parts":[{"p":[{"t":"Suppose "},{"m":"x"},{"t":" satisfies "},{"m":"2^x = 5"},{"t":", prove, by contradiction, that "},{"m":"x"},{"t":" is irrational."}]}]},{"label":"Example 1.7 · Equivalence","parts":[{"p":[{"t":"Let "},{"m":"n \\in \\mathbb{Z}"},{"t":", prove that "},{"m":"n"},{"t":" is divisible by 3 if and only if "},{"m":"n^2"},{"t":" is divisible by 3."}]}]}]},"1":{"intro":[{"t":"The technique demonstrated in this section is called "},{"b":"telescopic cancelling"},{"t":"."}],"blocks":[{"p":[{"t":"Like a telescope, the middle section collapses (by cancelling) leaving just the outer terms to be computed."}]}],"examples":[{"label":"Example 2.1","parts":[{"p":[{"t":"Find the constants "},{"m":"a"},{"t":" and "},{"m":"b"},{"t":" such that "},{"m":"\\dfrac{1}{k(k+1)} = \\dfrac{a}{k} + \\dfrac{b}{k+1}"},{"t":", for all "},{"m":"k \\in \\mathbb{N}"},{"t":"."}]},{"p":[{"t":"Hence, prove that"}]},{"f":"\\dfrac{1}{1\\times 2} + \\dfrac{1}{2\\times 3} + \\dfrac{1}{3\\times 4} + \\cdots + \\dfrac{1}{n(n+1)} = \\dfrac{n}{n+1}"}]},{"label":"Example 2.2","parts":[{"p":[{"t":"Prove that"}]},{"f":"\\dfrac{1}{\\sqrt{1} + \\sqrt{2}} + \\dfrac{1}{\\sqrt{2} + \\sqrt{3}} + \\dfrac{1}{\\sqrt{3} + \\sqrt{4}} + \\cdots + \\dfrac{1}{\\sqrt{15} + \\sqrt{16}} = 3"}]},{"label":"Question 1","parts":[{"p":[{"t":"Find constants "},{"m":"a"},{"t":" and "},{"m":"b"},{"t":" such that "},{"m":"\\dfrac{1}{(2k-1)(2k+1)} = \\dfrac{a}{2k-1} + \\dfrac{b}{2k+1}"},{"t":" for all "},{"m":"k \\in \\mathbb{N}"},{"t":"."}]},{"p":[{"t":"Hence evaluate"}]},{"f":"\\dfrac{1}{1\\times 3} + \\dfrac{1}{3\\times 5} + \\dfrac{1}{5\\times 7} + \\cdots + \\dfrac{1}{19\\times 21}"}]},{"label":"Question 2","parts":[{"p":[{"t":"Prove that"}]},{"f":"\\dfrac{1}{1\\times 4} + \\dfrac{1}{4\\times 7} + \\dfrac{1}{7\\times 10} + \\cdots + \\dfrac{1}{(3n-2)(3n+1)} = \\dfrac{n}{3n+1}"},{"p":[{"t":"for "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]}]},{"label":"Question 3","parts":[{"p":[{"t":"Find the value of"}]},{"f":"\\dfrac{1}{\\sqrt{2} + \\sqrt{3}} + \\dfrac{1}{\\sqrt{3} + \\sqrt{4}} + \\dfrac{1}{\\sqrt{4} + \\sqrt{5}} + \\cdots + \\dfrac{1}{\\sqrt{99} + \\sqrt{100}}"}]},{"label":"Question 4","parts":[{"p":[{"t":"Show that "},{"m":"\\dfrac{1}{k(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{k} - \\dfrac{1}{k+2}\\right)"},{"t":" for all "},{"m":"k \\in \\mathbb{N}"},{"t":"."}]},{"p":[{"t":"Hence evaluate"}]},{"f":"\\dfrac{1}{1\\times 3} + \\dfrac{1}{2\\times 4} + \\dfrac{1}{3\\times 5} + \\cdots + \\dfrac{1}{50\\times 52}"}]},{"label":"Question 5","parts":[{"p":[{"t":"Prove that "},{"m":"\\displaystyle\\sum_{k=1}^{n} \\dfrac{1}{(2k-1)(2k+1)} = \\dfrac{n}{2n+1}"},{"t":" for "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]}]},{"label":"Question 6","parts":[{"p":[{"t":"Find constants "},{"m":"a"},{"t":", "},{"m":"b"},{"t":" and "},{"m":"c"},{"t":" such that "},{"m":"\\dfrac{k}{(k+1)(k+2)} = \\dfrac{a}{k+1} + \\dfrac{b}{k+2}"},{"t":" for all "},{"m":"k \\in \\mathbb{N}"},{"t":"."}]},{"p":[{"t":"Hence find "},{"m":"\\displaystyle\\sum_{k=1}^{n} \\dfrac{k}{(k+1)(k+2)}"},{"t":"."}]}]},{"label":"Question 7","parts":[{"p":[{"t":"Evaluate"}]},{"f":"\\dfrac{1}{\\sqrt{1} + \\sqrt{3}} + \\dfrac{1}{\\sqrt{3} + \\sqrt{5}} + \\dfrac{1}{\\sqrt{5} + \\sqrt{7}} + \\cdots + \\dfrac{1}{\\sqrt{97} + \\sqrt{99}}"}]},{"label":"Question 8","parts":[{"p":[{"t":"Show that "},{"m":"\\sqrt{k+1} - \\sqrt{k-1} = \\dfrac{2}{\\sqrt{k+1} + \\sqrt{k-1}}"},{"t":" for all "},{"m":"k \\geqslant 2"},{"t":"."}]},{"p":[{"t":"Hence evaluate"}]},{"f":"\\dfrac{2}{\\sqrt{2} + \\sqrt{0}} + \\dfrac{2}{\\sqrt{3} + \\sqrt{1}} + \\dfrac{2}{\\sqrt{4} + \\sqrt{2}} + \\cdots + \\dfrac{2}{\\sqrt{101} + \\sqrt{99}}"}]}]},"2":{"intro":[{"b":"Mathematical Induction"},{"t":" is the process of proving a statement by showing it is true for the base case, then showing that if it is true for some integer "},{"m":"k"},{"t":", then it is true for "},{"m":"k + 1"},{"t":"; it then follows it must be true for all integers greater than the base case."}],"blocks":[{"p":[{"t":"The steps are:"}]},{"list":[[{"t":"Show it is true for the base case, usually (but not always) "},{"m":"n = 1"},{"t":"."}],[{"t":"Assume there exists some integer "},{"m":"k"},{"t":", where the statement holds."}],[{"t":"Show that the statement holds for "},{"m":"k + 1"},{"t":"."}],[{"t":"Conclude that the statement is true for all integers greater than or equal to the base case, usually (but not always) "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]],"ordered":true,"lettered":false},{"h":"Why it works: dominoes"},{"dominoes":true},{"miscon":[{"title":"Why the proof switches from n to k","p":[{"t":"The statement is about every natural number "},{"m":"n"},{"t":". If the inductive step began “assume it is true for "},{"m":"n"},{"t":"”, you would be assuming the very thing you are trying to prove. Instead you assume it for "},{"b":"one particular value"},{"t":", "},{"m":"k"},{"t":", and show that this forces it to be true for "},{"m":"k + 1"},{"t":". A new letter makes it clear that "},{"m":"k"},{"t":" is a single value you have assumed, while "},{"m":"n"},{"t":" stays the general variable in the claim."}]},{"title":"k is not special: use a letter that is not already taken","p":[{"t":"If the question is already written in terms of "},{"m":"k"},{"t":", choose a different letter for the assumption, such as "},{"m":"m"},{"t":". For example, to prove "},{"m":"\\sum_{k=1}^{n} k(k+1) = \\tfrac{1}{3}n(n+1)(n+2)"},{"t":", writing “assume true for "},{"m":"n = k"},{"t":"” gives "},{"m":"\\sum_{k=1}^{k}"},{"t":", which makes no sense. Instead write:"}],"f":"\\text{Assume } \\sum_{k=1}^{m} k(k+1) = \\tfrac{1}{3}m(m+1)(m+2) \\text{ for some } m \\in \\mathbb{N}","p2":[{"t":"then prove it for "},{"m":"m + 1"},{"t":". The same goes for a question stated as “for all "},{"m":"k \\in \\mathbb{N}"},{"t":"”: the letter in the question and the letter in your assumption must be different."}]},{"title":"Substitute k + 1 everywhere","p":[{"t":"In the inductive step, replace "},{"b":"every"},{"t":" "},{"m":"n"},{"t":" with "},{"m":"k + 1"},{"t":", including inside the last term of a sum. Write down the target, the statement for "},{"m":"k + 1"},{"t":", before you start, so you know what you are aiming for."}]},{"title":"Work on each side separately, not on the whole equation","p":[{"t":"VCAA examiners want to see you start from one side of the "},{"m":"k + 1"},{"t":" statement (usually the left), use the inductive assumption, and work through to the other side. Do not treat the statement as an equation to solve by adding, multiplying or cancelling on both sides: that starts from the result you are trying to prove. Continuing the example above:"}],"f":"\\begin{aligned} \\text{LHS} &= \\sum_{k=1}^{m+1} k(k+1) = \\sum_{k=1}^{m} k(k+1) + (m+1)(m+2) \\\\ &= \\tfrac{1}{3}m(m+1)(m+2) + (m+1)(m+2) \\quad \\text{(by the assumption)} \\\\ &= \\tfrac{1}{3}(m+1)(m+2)(m+3) = \\text{RHS} \\end{aligned}","p2":[{"t":"If neither side leads easily to the other, simplify the left side and the right side separately and show they come to the same expression."}]}]},{"h":"Notation for Products"},{"p":[{"t":"We have seen previously that infinite or partial sums can be written using sigma notation, "},{"m":"\\Sigma"},{"t":". In a similar way, products can be written using pi notation, "},{"m":"\\Pi"},{"t":"."}]}],"examples":[{"label":"Example 3.1 · Partial sums","parts":[{"p":[{"t":"Prove the following for "},{"m":"n \\in \\mathbb{N}"},{"t":", using mathematical induction:"}]},{"f":"\\dfrac{1}{1\\times 2} + \\dfrac{1}{2\\times 3} + \\dfrac{1}{3\\times 4} + \\cdots + \\dfrac{1}{n(n+1)} = \\dfrac{n}{n+1}"}]},{"label":"Example 3.2 · Partial sums","parts":[{"p":[{"t":"Prove the following:"}]},{"f":"\\sum_{i=1}^{n} (2i - 1)^3 = n^2(2n^2 - 1)"}]},{"label":"Example 3.3 · Divisibility","parts":[{"p":[{"t":"Prove that "},{"m":"7^n - 4"},{"t":" is divisible by 3 for all "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]}]},{"label":"Example 3.4 · Products","parts":[{"p":[{"t":"Prove the following, using mathematical induction:"}]},{"f":"\\prod_{i=1}^{n} \\left(1 + \\dfrac{1}{i}\\right) = n + 1"}]},{"label":"Example 3.5 · Inequalities","parts":[{"p":[{"t":"Prove, using mathematical induction, that "},{"m":"2^n \\geqslant n^2"},{"t":" for all natural numbers "},{"m":"n \\geqslant 4"},{"t":"."}]}]}]},"3":{"intro":[{"t":"A working lesson on exam-style proof questions, to be submitted in Term 1."}],"blocks":[],"examples":[{"label":"Exam-style 1 · Induction","parts":[{"p":[{"t":"Prove by mathematical induction that "},{"m":"n^3 + 2n"},{"t":" is divisible by 3 for all "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]}]},{"label":"Exam-style 2 · Contrapositive","parts":[{"p":[{"t":"Write down the contrapositive of the statement ‘If "},{"m":"n^2"},{"t":" is even, then "},{"m":"n"},{"t":" is even’, where "},{"m":"n \\in \\mathbb{Z}"},{"t":". Hence prove the statement."}]}]},{"label":"Exam-style 3 · Contradiction","parts":[{"p":[{"t":"Prove by contradiction that "},{"m":"\\sqrt{3}"},{"t":" is irrational."}]}]},{"label":"Exam-style 4 · Counterexample","parts":[{"p":[{"t":"Disprove the statement: for all "},{"m":"n \\in \\mathbb{N}"},{"t":", "},{"m":"n^2 + n + 41"},{"t":" is prime."}]}]},{"label":"Exam-style 5 · Induction with factorials","parts":[{"p":[{"t":"Prove by mathematical induction that "},{"m":"\\displaystyle\\sum_{i=1}^{n} i \\cdot i! = (n+1)! - 1"},{"t":" for all "},{"m":"n \\in \\mathbb{N}"},{"t":"."}]}]}]}} };
const QUIZ_BANK = { proof: {"0":[{"prompt":"What is the contrapositive of ‘If it rains, then the ground is wet’?","options":["If the ground is wet, then it rained","If it does not rain, then the ground is not wet","If the ground is not wet, then it did not rain","It rains and the ground is not wet"],"correct":2,"right":"Yes. The contrapositive of P ⟹ Q is ¬Q ⟹ ¬P.","wrong":"Swap and negate both parts: ¬Q ⟹ ¬P. The first option is the converse and the second is the inverse."},{"prompt":"What is the negation of ‘For all n ∈ N, n² ≥ n’?","options":["There exists n ∈ N such that n² < n","For all n ∈ N, n² < n","There exists n ∈ N such that n² ≥ n","For all n ∈ N, n² ≤ n"],"correct":0,"right":"Correct. ‘For all’ becomes ‘there exists’, and the inequality is negated.","wrong":"Change the quantifier (‘for all’ → ‘there exists’) and negate the property (≥ becomes <)."},{"prompt":"To disprove a universal (‘for all’) statement, you need…","options":["a proof by induction","the contrapositive","two examples","one counterexample"],"correct":3,"right":"Yes. A single counterexample is enough.","wrong":"One case where the statement fails is enough to disprove a ‘for all’ statement."},{"prompt":"What is the converse of P ⟹ Q?","options":["¬Q ⟹ ¬P","Q ⟹ P","¬P ⟹ ¬Q","P ∧ ¬Q"],"correct":1,"right":"Correct. The converse swaps hypothesis and conclusion.","wrong":"The converse swaps P and Q: Q ⟹ P. (¬Q ⟹ ¬P is the contrapositive.)"}],"1":[{"prompt":"Which partial fraction form is 1 / (k(k + 1))?","options":["1/k + 1/(k + 1)","1/(k + 1) − 1/k","1/k − 1/(k + 1)","k − (k + 1)"],"correct":2,"right":"Yes. Over a common denominator, (k + 1 − k) / (k(k + 1)) = 1 / (k(k + 1)).","wrong":"Check by combining: 1/k − 1/(k + 1) = (k + 1 − k) / (k(k + 1)) = 1 / (k(k + 1))."},{"prompt":"What is 1/(1×2) + 1/(2×3) + … + 1/(9×10)?","options":["9/10","1/10","10/11","1"],"correct":0,"right":"Correct. Using n/(n + 1) with n = 9.","wrong":"The terms telescope to 1 − 1/10 = 9/10."},{"prompt":"The sum Σ from k = 1 to n of (f(k) − f(k + 1)) simplifies to…","options":["f(n) − f(1)","f(n + 1) − f(1)","0","f(1) − f(n + 1)"],"correct":3,"right":"Yes. Every middle term cancels, leaving the first and last.","wrong":"Write out the first few terms: f(1) − f(2) + f(2) − f(3) + … leaves f(1) − f(n + 1)."},{"prompt":"Rationalising the denominator, 1 / (√k + √(k + 1)) equals…","options":["√k − √(k + 1)","√(k + 1) − √k","√(k + 1) + √k","1 / (2√k)"],"correct":1,"right":"Correct. Multiply by √(k + 1) − √k; the denominator becomes (k + 1) − k = 1.","wrong":"Multiply top and bottom by √(k + 1) − √k. The denominator becomes 1, leaving √(k + 1) − √k."}],"2":[{"prompt":"What is the first step of a proof by induction?","options":["Assume the statement is true for n = k","Prove the statement for n = k + 1","Show the statement is true for the base case","Conclude it is true for all n"],"correct":2,"right":"Yes. Start by checking the base case.","wrong":"Induction starts with the base case, usually n = 1."},{"prompt":"To prove 4ⁿ − 1 is divisible by 3, what is the inductive assumption?","options":["4ᵏ − 1 = 3m for some m ∈ Z","4ⁿ − 1 = 3 for all n","4ᵏ⁺¹ − 1 = 3m for some m ∈ Z","4ᵏ − 1 is even"],"correct":0,"right":"Correct. Write the assumption as an equation with an integer m.","wrong":"Assume it holds for n = k and write it as an equation: 4ᵏ − 1 = 3m, m ∈ Z."},{"prompt":"If P(n) is 1 + 2 + … + n = n(n + 1)/2, what does P(k + 1) say?","options":["1 + 2 + … + (k + 1) = k(k + 1)/2 + 1","1 + 2 + … + (k + 1) = (k + 2)(k + 3)/2","1 + 2 + … + (k + 1) = (k + 1)k/2","1 + 2 + … + (k + 1) = (k + 1)(k + 2)/2"],"correct":3,"right":"Yes. Replace every n with k + 1.","wrong":"Substitute n = k + 1 everywhere: (k + 1)((k + 1) + 1)/2 = (k + 1)(k + 2)/2."},{"prompt":"To prove 2ⁿ ≥ n² for all n ≥ 4, the base case is…","options":["n = 1","n = 4","n = 0","n = 2"],"correct":1,"right":"Correct. The statement starts at n = 4, so that is the base case.","wrong":"The base case is the first value the statement claims: n = 4 (16 ≥ 16)."}],"3":[{"prompt":"Which method is the natural choice to prove that √2 is irrational?","options":["Induction","Contradiction","Counterexample","Direct proof from the definition"],"correct":1,"right":"Yes. Assume √2 = p/q in lowest terms and reach a contradiction.","wrong":"Irrational means ‘not rational’, so assume it is rational and show that leads to nonsense: contradiction."},{"prompt":"Which statement is logically equivalent to P ⟹ Q?","options":["Q ⟹ P","¬P ⟹ ¬Q","P ∧ ¬Q","¬Q ⟹ ¬P"],"correct":3,"right":"Correct. The contrapositive always has the same truth value.","wrong":"Only the contrapositive, ¬Q ⟹ ¬P, is equivalent. The converse and inverse can be false when P ⟹ Q is true."},{"prompt":"To disprove ‘for all n ∈ N, n² + n + 41 is prime’, it is enough to…","options":["find one n where it is not prime","prove it by induction","check n = 1, 2 and 3","show it is odd for every n"],"correct":0,"right":"Yes. One counterexample is enough — n = 40 gives 1681 = 41².","wrong":"A single counterexample disproves a ‘for all’ statement. n = 40 gives 40² + 40 + 41 = 1681 = 41²."},{"prompt":"In an induction proof that an expression is divisible by 3, the k + 1 step should finish with…","options":["the expression equal to 3","an expression that is odd","3 × (an integer)","the base case again"],"correct":2,"right":"Correct. Write it as 3 times an integer and say why the bracket is an integer.","wrong":"You need to show the k + 1 expression equals 3 × (an integer), using the inductive assumption."}]} };
const PROOF_WATCH = { proof: {"0":[{"t":"The converse and the inverse are "},{"b":"not"},{"t":" equivalent to the original statement — only the contrapositive is. When negating a ‘for all’ statement, change the quantifier as well as the property."}],"1":[{"t":"Write out the first three and last two terms before cancelling, so you can see exactly which terms survive. With gaps like "},{"m":"\\tfrac{1}{k} - \\tfrac{1}{k+2}"},{"t":", two terms survive at each end, not one."}],"2":[{"t":"State the inductive assumption as an equation, and show clearly where you use it in the "},{"m":"k + 1"},{"t":" step. Finish with a concluding sentence — it carries a mark."}]} };
const STRANDS = ["Proof, algorithms and number", "Functions and graphs", "Calculus", "Vectors", "Probability and statistics"];
const BRIGHT = [["#fff0bf", "#ffd96a", "#5c3b00", "#ff9f1c"], ["#ffd9cc", "#ffad94", "#7a1f08", "#f2542d"], ["#d4f3ea", "#9fe0cf", "#0b4a3e", "#1fa38a"], ["#e6dcff", "#c9b6ff", "#35208a", "#7b5cff"], ["#fff0bf", "#ffd96a", "#5c3b00", "#ff9f1c"]];

class Component extends DCLogic {
  componentDidMount() {
    this.renderTex();
    fetch("data/course-content.json", { cache: "no-cache" }).then(r => r.json()).then(c => this.setState({ content: c })).catch(() => {});
    fetch("data/quizzes.json", { cache: "no-cache" }).then(r => r.json()).then(q => this.setState({ quizzes: q })).catch(() => {});
  }
  componentDidUpdate() { this.renderTex(); }
  renderTex() {
    const go = (tries) => {
      if (!window.katex) { if (tries < 60) setTimeout(() => go(tries + 1), 150); return; }
      document.querySelectorAll("[data-tex]").forEach(el => {
        const tex = el.getAttribute("data-tex");
        if (el.__tex === tex && el.childNodes.length) return;
        window.katex.render(tex, el, { throwOnError: false, displayMode: el.hasAttribute("data-display") });
        el.__tex = tex;
      });
    };
    go(0);
  }
  state = {
    screen: "home",
    topicId: "vec3d",
    lessonIdx: 2,
    ca: [3, 2, -1],
    cb: [1, 0, 2],
    cyaw: 0.7,
    cswap: false,
    tn: 4,
    tc: 0,
    steps: {},
    tab: null,
    yaw: 0.6,
    a: [3, -1, 2],
    b: [1, 4, -2],
    picks: {}
  };

  fmt(n) { return (Math.round(n * 100) / 100).toFixed(2); }

  project(p, yaw) {
    const pitch = 0.42, sc = 30, cx = 200, cy = 190;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const X = p[0] * c - p[2] * s;
    const D = p[0] * s + p[2] * c;
    return [cx + X * sc, cy - (p[1] * Math.cos(pitch) - D * Math.sin(pitch)) * sc];
  }

  buildCross(a, b, c, yaw, scaled) {
    const h = React.createElement;
    const P = (p) => this.project(p, yaw);
    const kids = [];
    const ln = (p1, p2, stroke, w, extra, key) => { const A = P(p1), B = P(p2); kids.push(h("line", Object.assign({ key, x1: A[0], y1: A[1], x2: B[0], y2: B[1], stroke, strokeWidth: w, strokeLinecap: "round" }, extra || {}))); };
    const floor = [[-5, 0, -5], [5, 0, -5], [5, 0, 5], [-5, 0, 5]].map(P);
    kids.push(h("polygon", { key: "f", points: floor.map(p => p.join(",")).join(" "), fill: "#dcd3c4", opacity: 0.5 }));
    [[[5.6, 0, 0], "x"], [[0, 5.6, 0], "y"], [[0, 0, 5.6], "z"]].forEach((ax, i) => {
      ln([0, 0, 0], ax[0], "#c0b6a5", 1.5, null, "ax" + i);
      const E = P(ax[0]); kids.push(h("text", { key: "axl" + i, x: E[0] + 6, y: E[1] + 4, fontSize: 12, fontWeight: 700, fill: "#82796a", fontFamily: "Figtree, sans-serif" }, ax[1]));
    });
    const ab = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    kids.push(h("polygon", { key: "pg", points: [[0, 0, 0], a, ab, b].map(P).map(p => p.join(",")).join(" "), fill: "#c9b6ff", opacity: 0.55, stroke: "#7b5cff", strokeWidth: 1.5, strokeDasharray: "4 4" }));
    const arrow = (v, color, label, key) => {
      const O = P([0, 0, 0]), E = P(v);
      const dx = E[0] - O[0], dy = E[1] - O[1], len = Math.hypot(dx, dy);
      if (len < 2) return;
      const ux = dx / len, uy = dy / len, px = -uy, py = ux, tip = 11;
      kids.push(h("line", { key: key + "l", x1: O[0], y1: O[1], x2: E[0], y2: E[1], stroke: color, strokeWidth: 4, strokeLinecap: "round" }));
      kids.push(h("polygon", { key: key + "h", points: [E[0], E[1], E[0] - ux * tip + px * 5.5, E[1] - uy * tip + py * 5.5, E[0] - ux * tip - px * 5.5, E[1] - uy * tip - py * 5.5].join(" "), fill: color }));
      kids.push(h("text", { key: key + "t", x: E[0] + ux * 18, y: E[1] + uy * 18, dy: 5, textAnchor: "middle", fontSize: 14, fontWeight: 800, fill: color, fontFamily: "Figtree, sans-serif" }, label));
    };
    arrow(b, "#1fa38a", "b", "b");
    arrow(a, "#c67139", "a", "a");
    arrow(c, "#7b5cff", scaled ? "×(scaled)" : "×", "c");
    return h("svg", { viewBox: "0 0 400 340", style: { width: "100%", display: "block" } }, kids);
  }

  buildScene(a, b, proj, yaw) {
    const h = React.createElement;
    const P = (p) => this.project(p, yaw);
    const line = (p1, p2, stroke, w, extra) => {
      const A = P(p1), B = P(p2);
      return h("line", Object.assign({ x1: A[0], y1: A[1], x2: B[0], y2: B[1], stroke, strokeWidth: w, strokeLinecap: "round" }, extra || {}));
    };
    const axis = (v, label) => {
      const E = P(v);
      return [
        line([0, 0, 0], v, "#c0b6a5", 1.5),
        h("text", { x: E[0], y: E[1], dy: 4, dx: 6, fontSize: 12, fontWeight: 700, fill: "#82796a", fontFamily: "Figtree, sans-serif" }, label)
      ];
    };
    const arrow = (v, color, label) => {
      const O = P([0, 0, 0]), E = P(v);
      const dx = E[0] - O[0], dy = E[1] - O[1];
      const len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len, px = -uy, py = ux;
      const tip = 11;
      return [
        h("line", { x1: O[0], y1: O[1], x2: E[0], y2: E[1], stroke: color, strokeWidth: 4, strokeLinecap: "round" }),
        h("polygon", { points: [E[0], E[1], E[0] - ux * tip + px * 5.5, E[1] - uy * tip + py * 5.5, E[0] - ux * tip - px * 5.5, E[1] - uy * tip - py * 5.5].join(" "), fill: color }),
        h("text", { x: E[0] + ux * 16, y: E[1] + uy * 16, dy: 5, textAnchor: "middle", fontSize: 15, fontWeight: 800, fill: color, fontFamily: "Figtree, sans-serif" }, label)
      ];
    };
    const kids = [];
    const floor = [[-5, 0, -5], [5, 0, -5], [5, 0, 5], [-5, 0, 5]].map(P);
    kids.push(h("polygon", { key: "f", points: floor.map(p => p.join(",")).join(" "), fill: "#dcd3c4", opacity: 0.5 }));
    [[[5.6, 0, 0], "x"], [[0, 5.6, 0], "y"], [[0, 0, 5.6], "z"]].forEach((ax, i) => {
      axis(ax[0], ax[1]).forEach((el, j) => kids.push(React.cloneElement(el, { key: "ax" + i + j })));
    });
    line([0, 0, 0], [proj[0] * 1.6, proj[1] * 1.6, proj[2] * 1.6], "#8fa073", 1.5, { strokeDasharray: "4 5" });
    kids.push(React.cloneElement(line([0, 0, 0], [b[0] * 1.7, b[1] * 1.7, b[2] * 1.7], "#aebf92", 1.5, { strokeDasharray: "3 6" }), { key: "bl" }));
    kids.push(React.cloneElement(line(a, proj, "#8c491a", 2, { strokeDasharray: "5 5", opacity: 0.7 }), { key: "drop" }));
    kids.push(React.cloneElement(line([0, 0, 0], proj, "#56633f", 7, { opacity: 0.55 }), { key: "proj" }));
    arrow(b, "#7a8a5e", "b").forEach((el, i) => kids.push(React.cloneElement(el, { key: "b" + i })));
    arrow(a, "#c67139", "a").forEach((el, i) => kids.push(React.cloneElement(el, { key: "a" + i })));
    return h("svg", { viewBox: "0 0 400 340", style: { width: "100%", display: "block" } }, kids);
  }

  renderVals() {
    const s = this.state;
    const a = s.a, b = s.b;
    const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const ma = Math.hypot(a[0], a[1], a[2]);
    const mb = Math.hypot(b[0], b[1], b[2]);
    const cos = (ma && mb) ? dot / (ma * mb) : 0;
    const angle = Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
    const k = mb ? dot / (mb * mb) : 0;
    const proj = [b[0] * k, b[1] * k, b[2] * k];
    const scalarProj = mb ? dot / mb : 0;

    const set = (which, i) => (e) => {
      const v = parseFloat(e.target.value);
      this.setState(prev => {
        const next = prev[which].slice();
        next[i] = v;
        return { [which]: next };
      });
    };
    const comp = ["₁", "₂", "₃"];
    const sliders = [];
    ["a", "b"].forEach(which => {
      s[which].forEach((v, i) => {
        sliders.push({
          label: which + comp[i],
          value: v,
          cls: which === "b" ? "sage" : "",
          onInput: set(which, i),
          labelStyle: "font-size: 15px; font-weight: 800; color: " + (which === "b" ? "#56633f" : "#8c491a") + ";"
        });
      });
    });

    const cardTints = [
      ["#ffd96a", "#ff9f1c"],
      ["#ffad94", "#f2542d"],
      ["#9fe0cf", "#1fa38a"],
      ["#c9b6ff", "#7b5cff"]
    ];
    const courseData = [
      ["Years 7–9", "Junior secondary", "Number, algebra and the first proper look at proof. Built to be dragged around.", "42 lessons", "Next: linear graphs"],
      ["Year 10", "Pre-Methods", "The bridge year. Quadratics, trigonometry and enough algebra to make Year 11 feel survivable.", "36 lessons", "Next: the quadratic formula"],
      ["Years 11–12", "Mathematical Methods", "Calculus, probability and functions, with every worked example available at half speed.", "58 lessons", "Next: chain rule"],
      ["Years 11–12", "Specialist Maths", "Complex numbers, vectors, mechanics. The interactives earn their keep here.", "61 lessons", "Next: vectors in 3D"]
    ];
    const goTopic = () => this.setState({ screen: "topic", topicId: "vec3d" });
    const goCourse = () => this.setState({ screen: "course" });
    const openTopic = (id) => () => this.setState({ screen: "topic", topicId: id });
    const goLesson = () => this.setState({ screen: "lesson", lessonIdx: 2, lessonTopic: "vec3d", tab: s.tab || (this.props.defaultTab ?? "Notes") });
    const openLesson = (i, tid) => this.setState(prev => ({ screen: "lesson", lessonIdx: i, lessonTopic: tid || prev.lessonTopic || "vec3d", tab: this.props.defaultTab ?? "Notes" }));
    const courses = courseData.map((c, i) => ({
      band: c[1],
      title: c[0] === "Years 11–12" ? c[2].split(",")[0] && c[1] : c[0],
      blurb: c[2],
      count: c[3],
      next: c[4],
      open: i === 3 ? goCourse : undefined,
      cardStyle: "position: relative; overflow: hidden; background: " + cardTints[i][0] + "; border-radius: 28px; padding: 30px; cursor: pointer; transition: transform 0.18s ease, box-shadow 0.18s ease; box-shadow: var(--shadow-sm); min-height: 250px;",
      blobStyle: "position: absolute; width: 190px; height: 190px; border-radius: 999px; background: " + cardTints[i][1] + "; opacity: 0.55; right: -70px; top: -70px;"
    }));
    courses[0].title = "Years 7–9 Maths";
    courses[1].title = "Year 10 Maths";
    courses[2].title = "Mathematical Methods";
    courses[3].title = "Specialist Maths";

    const showProgress = this.props.showProgress ?? true;
    const chipTint = { Notes: ["#ffd96a", "#5c3b00"], Video: ["#ffad94", "#7a1f08"], Interactive: ["#9fe0cf", "#0b4a3e"], Practice: ["#c9b6ff", "#35208a"] };
    const bright = [["#fff0bf", "#ffd96a", "#5c3b00"], ["#ffd9cc", "#ffad94", "#7a1f08"], ["#d4f3ea", "#9fe0cf", "#0b4a3e"], ["#e6dcff", "#c9b6ff", "#35208a"]];
    const T = TOPICS.find(t => t.id === s.topicId) || TOPICS[10];
    const tc = BRIGHT[T.strand];
    const vecLessons = LESSONS.map((l, i) => {
      const done = showProgress && i < 3;
      const current = showProgress && i === 3;
      return {
        n: String(i + 1),
        done: !!done,
        notDone: !done,
        title: l[0],
        blurb: l[1],
        mins: l[3],
        open: () => this.setState({ screen: "lesson", tab: this.props.defaultTab ?? "Notes" }),
        rowStyle: "display: grid; grid-template-columns: 54px minmax(0, 1fr) auto 70px; gap: 22px; align-items: center; background: var(--color-neutral-100); border: 2px solid " + (current ? "#f2542d" : "transparent") + "; border-radius: 28px; padding: 22px 26.4px; cursor: pointer; transition: border-color 0.15s ease, box-shadow 0.15s ease;",
        numStyle: "width: 44px; height: 44px; border-radius: 999px; display: grid; place-items: center; font-family: var(--font-heading); font-size: 19px; background: " + (done ? "#1fa38a" : current ? "#f2542d" : bright[i % 4][1]) + "; color: " + (done || current ? "#fff" : bright[i % 4][2]) + ";",
        chips: l[2].map(c => ({ label: c, style: "font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: " + chipTint[c][0] + "; color: " + chipTint[c][1] + ";" })),
        hoverStyle: "border-color: #f2542d; box-shadow: var(--shadow-md);",
        practice: ""
      };
    });
    const otherLessons = T.lessons.map((l, i) => { const built = T.id === "vec3d" || !!CONTENT[T.id] || !!(s.content || {})[T.id]; return {
      n: String(i + 1), done: false, notDone: true, title: l[0], blurb: l[1], practice: l[3] || "",
      mins: l[2] ? l[2] + (l[2] === 1 ? " example" : " examples") : "",
      open: built ? (() => openLesson(i, T.id)) : undefined,
      hoverStyle: built ? "border-color: #f2542d; box-shadow: var(--shadow-md);" : "box-shadow: var(--shadow-sm);",
      rowStyle: "display: grid; grid-template-columns: 54px minmax(0, 1fr) auto 100px; gap: 22px; align-items: center; background: var(--color-neutral-100); border: 2px solid " + (built ? tc[1] : "transparent") + "; border-radius: 28px; padding: 22px 26.4px;" + (built ? " cursor: pointer;" : ""),
      numStyle: "width: 44px; height: 44px; border-radius: 999px; display: grid; place-items: center; font-family: var(--font-heading); font-size: 19px; background: " + tc[1] + "; color: " + tc[2] + ";",
      chips: [{ label: "Notes", style: "font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: " + tc[0] + "; color: " + tc[2] + ";" }].concat(built && T.id === "vec3d" && (i === 2 || i === 3) ? [{ label: "Interactive", style: "font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #9fe0cf; color: #0b4a3e;" }] : []).concat(built ? [{ label: "Open lesson →", style: "font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #f2542d; color: #fff;" }] : [])
    }; });
    const lessons = otherLessons;
    const lessonCount = (t) => t.lessons.length;
    const exCount = (t) => t.lessons.reduce((a, l) => a + (l[2] || 0), 0);
    const ti = TOPICS.indexOf(T);
    const prevT = TOPICS[(ti + TOPICS.length - 1) % TOPICS.length], nextT = TOPICS[(ti + 1) % TOPICS.length];
    const ex = exCount(T);
    const topic = {
      title: T.title, intro: T.intro,
      kicker: STRANDS[T.strand] + (T.unit ? " · " + T.unit : ""),
      panelStyle: "background: " + tc[1] + "; border-radius: 28px; padding: 26.4px; box-shadow: var(--shadow-sm);",
      stats: [{ value: String(lessonCount(T)), label: "lessons" }, { value: ex ? String(ex) : "—", label: "worked examples" }],
      prev: openTopic(prevT.id), next: openTopic(nextT.id), prevTitle: prevT.title, nextTitle: nextT.title
    };
    const E = EXAM[T.id];
    const shown = s.steps[T.id] || 0;
    const exam = {
      patterns: E.patterns.map(p => ({ text: p[0], src: p[1], srcStyle: "justify-self: start; font-size: 12px; font-weight: 700; padding: 4px 11px; border-radius: 999px; background: " + tc[0] + "; color: " + tc[2] + ";" })),
      marks: E.marks, question: E.q, trap: E.trap,
      shownSteps: E.steps.slice(0, shown).map((t, i) => ({ n: String(i + 1), text: t })),
      finished: shown >= E.steps.length,
      nextLabel: shown === 0 ? "Show first step" : (shown >= E.steps.length ? "All steps shown" : "Show next step"),
      nextStep: () => this.setState(prev => ({ steps: Object.assign({}, prev.steps, { [T.id]: Math.min((prev.steps[T.id] || 0) + 1, E.steps.length) }) })),
      reset: () => this.setState(prev => ({ steps: Object.assign({}, prev.steps, { [T.id]: 0 }) })),
      note: "Exam-style question written to match the pattern, not copied from a paper. Have a go on paper before revealing.",
      cardStyle: "background: " + tc[1] + "; color: " + tc[2] + "; border-radius: 28px; padding: 30px; box-shadow: var(--shadow-md);"
    };
    const LT = s.lessonTopic || "vec3d";
    const VT = TOPICS.find(t => t.id === LT);
    const goLessonTopic = () => this.setState({ screen: "topic", topicId: LT });
    const li = s.lessonIdx ?? 2;
    const LD = (LT === "vec3d" ? VEC_LESSONS : (CONTENT[LT] || (s.content || {})[LT] || {}))[li] || {};
    const isL3 = LT === "vec3d" && li === 2;
    const prep = (blocks, pre, isEx) => (blocks || []).map((b, bi) => ({
      h: b.h || "", h3: b.h3 || "", hStyle: "font-family: var(--font-heading); font-size: 28px; margin: " + (bi === 0 ? 0 : 44) + "px 0 15px;",
      isP: !!b.p, p: b.p || [], f: b.f || "",
      isUl: !!b.list && !b.ordered, isOl: !!b.list && !!b.ordered, olType: b.lettered ? "a" : "1", list: b.list || [],
      fig: !!b.fig, figId: pre + "-fig" + bi,
      isTable: !!b.table, rows: (b.table || []).map((r, ri) => ({ cells: r, style: ri === 0 ? "background: #d4f3ea; color: #0b4a3e; font-weight: 700;" : "" })),
      recall: !!b.recall, r1: b.r1 || [], rf: b.rf || "", r2: b.r2 || [],
      dominoes: !!b.dominoes,
      miscon: !!b.miscon, misconItems: b.miscon || []
    }));
    const WATCH = {
      0: [{ t: "Subtracting reverses the vector being subtracted: " }, { m: "\\overrightarrow{AB} = \\utilde{b} - \\utilde{a}" }, { t: ", not " }, { m: "\\utilde{a} - \\utilde{b}" }, { t: ". Getting the order wrong flips the direction of every answer that follows." }],
      3: [{ t: "The vector product is anti-commutative: " }, { m: "\\utilde{b} \\times \\utilde{a} = -(\\utilde{a} \\times \\utilde{b})" }, { t: ". Watch the minus sign on the " }, { m: "\\utilde{j}" }, { t: " term when expanding the determinant." }],
      4: [{ t: "A unit vector in the opposite direction needs both steps: divide by the magnitude " }, { b: "and" }, { t: " multiply by " }, { m: "-1" }, { t: "." }]
    };
    const vPrev = li > 0 ? () => openLesson(li - 1, LT) : goLessonTopic;
    const vNext = li < VT.lessons.length - 1 ? () => openLesson(li + 1, LT) : goLessonTopic;
    const ca = s.ca, cb = s.cb;
    const cross = (u, w) => [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
    const cv = s.cswap ? cross(cb, ca) : cross(ca, cb);
    const cm = Math.hypot(cv[0], cv[1], cv[2]);
    const cScale = cm > 5 ? 5 / cm : 1;
    const cDraw = cv.map(x => x * cScale);
    const cma = Math.hypot(ca[0], ca[1], ca[2]), cmb = Math.hypot(cb[0], cb[1], cb[2]);
    const cdot = ca[0] * cb[0] + ca[1] * cb[1] + ca[2] * cb[2];
    const cTheta = (cma && cmb) ? Math.acos(Math.max(-1, Math.min(1, cdot / (cma * cmb)))) * 180 / Math.PI : 0;
    const fm = (n) => { const r = Math.round(n * 100) / 100; return (Object.is(r, -0) ? 0 : r).toString(); };
    const vecStr = (v) => "(" + v.map(fm).join(", ") + ")";
    const setC = (which, i) => (e) => { const val = parseFloat(e.target.value); this.setState(prev => { const nx = prev[which].slice(); nx[i] = val; return { [which]: nx }; }); };
    const cSliders = [];
    [["ca", "a", "#8c491a", ""], ["cb", "b", "#0b4a3e", "sage"]].forEach(w => s[w[0]].forEach((val, i) => cSliders.push({ label: w[1] + ["₁", "₂", "₃"][i], value: val, cls: w[3], onInput: setC(w[0], i), labelStyle: "font-size: 15px; font-weight: 800; color: " + w[2] + ";" })));
    const rbox = (hl) => "background: " + (hl ? "#e6dcff" : "var(--color-bg)") + "; border-radius: 16px; padding: 12px 15px;";
    const cLabel = s.cswap ? "b × a" : "a × b";
    const crossVals = {
      cScene: this.buildCross(ca, cb, cDraw, s.cyaw, cScale < 1),
      cyaw: s.cyaw,
      setCYaw: (e) => this.setState({ cyaw: parseFloat(e.target.value) }),
      cSliders,
      cOrder: [[false, "a × b"], [true, "b × a"]].map(o => ({ label: o[1], select: () => this.setState({ cswap: o[0] }), style: "flex: 1; border: 0; font-family: var(--font-body); font-size: 14px; font-weight: 700; padding: 9px 14px; border-radius: 999px; cursor: pointer; background: " + (s.cswap === o[0] ? "#7b5cff" : "transparent") + "; color: " + (s.cswap === o[0] ? "#fff" : "#645c50") + ";" })),
      cReadouts: [
        { label: cLabel, value: vecStr(cv), style: rbox(true) + " grid-column: 1 / -1;" },
        { label: "|" + cLabel + "| = area", value: fm(cm), style: rbox(true) },
        { label: "angle θ", value: fm(cTheta) + "°", style: rbox(false) },
        { label: "a · (" + cLabel + ")", value: fm(ca[0] * cv[0] + ca[1] * cv[1] + ca[2] * cv[2]), style: rbox(false) },
        { label: "b · (" + cLabel + ")", value: fm(cb[0] * cv[0] + cb[1] * cv[1] + cb[2] * cv[2]), style: rbox(false) }
      ],
      cHint: cm < 0.001 ? "a and b are parallel (or one is zero): the parallelogram has no area, so the cross product is the zero vector." : "The purple arrow is perpendicular to both a and b — both dot products are 0. Its length equals the purple area" + (cScale < 1 ? " (drawn shorter here to fit)." : ".")
    };
    const tN = s.tn, tPull = s.tc;
    const PAIR = ["#1fa38a", "#7b5cff", "#f2542d", "#c48a00", "#1fa38a", "#7b5cff", "#f2542d"];
    const frac = (k) => k === 1 ? "1" : "\\tfrac{1}{" + k + "}";
    const stepExt = 84 / tN, stepMin = 2.4, segW = stepExt + 3;
    const step = stepExt * (1 - tPull) + stepMin * tPull;
    const extent = (tN - 1) * step + segW;
    const x0 = (100 - extent) / 2;
    const maxH = 46 + (tN - 1) * 13;
    const tubeFill = ["#d4f3ea", "#bfeadd", "#a9e1cf", "#93d8c2", "#7dcfb4", "#67c6a7"];
    const fadeInner = Math.max(0, 1 - tPull * 1.8);
    const tSegs = Array.from({ length: tN }, (_, i) => {
      const k = i + 1, h = 46 + i * 13;
      const lOp = i === 0 ? 1 - tPull : fadeInner, rOp = i === tN - 1 ? 1 - tPull : fadeInner;
      return {
        style: "position: absolute; left: " + (x0 + i * step) + "%; width: " + segW + "%; top: " + (75 - h / 2) + "px; height: " + h + "px; background: " + tubeFill[i] + "; border: 2px solid #1fa38a; border-radius: 10px; z-index: " + (i + 1) + "; box-sizing: border-box;",
        labelStyle: "position: absolute; left: 0; top: 0; bottom: 0; width: " + (stepExt / segW * 100) + "%; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 17px; white-space: nowrap;",
        lTex: (i === 0 ? "" : "+") + frac(k), rTex: "-" + frac(k + 1),
        lStyle: "opacity: " + lOp + "; color: " + (i === 0 ? "#201e1d" : PAIR[i - 1]) + "; font-weight: 700;",
        rStyle: "opacity: " + rOp + "; color: " + (i === tN - 1 ? "#201e1d" : PAIR[i]) + "; font-weight: 700;"
      };
    });
    const capBase = "position: absolute; top: 57px; height: 36px; padding: 0 12px; border-radius: 999px; background: #201e1d; color: #fff; display: flex; align-items: center; font-size: 16px; z-index: 20; opacity: " + Math.min(1, tPull * 1.6) + "; transform: translateX(var(--tx));";
    const tCapL = { tex: "1", style: capBase.replace("var(--tx)", "-100%") + " left: calc(" + x0 + "% - 6px);" };
    const tCapR = { tex: "-" + frac(tN + 1), style: capBase.replace("var(--tx)", "0") + " left: calc(" + (x0 + extent) + "% + 6px);" };
    const terms = Array.from({ length: tN }, (_, i) => { const k = i + 1; const L = k === 1 ? "1" : (tPull >= 0.4 ? "\\cancel{" + frac(k) + "}" : frac(k)); const R = k === tN ? "-" + frac(k + 1) : "-" + (tPull >= 0.4 ? "\\cancel{" + frac(k + 1) + "}" : frac(k + 1)); return "\\left(" + L + R + "\\right)"; });
    const animTo = (target) => {
      cancelAnimationFrame(this._traf);
      const tick = () => { const c = this.state.tc; const nx = c + (target - c) * 0.12 + (target > c ? 0.004 : -0.004); const done = target > c ? nx >= target : nx <= target; this.setState({ tc: done ? target : nx }); if (!done) this._traf = requestAnimationFrame(tick); };
      this._traf = requestAnimationFrame(tick);
    };
    const telVals = {
      hasTelescope: (s.lessonTopic === "proof") && (s.lessonIdx === 1),
      tSegs, tCapL, tCapR, tc: tPull,
      setTc: (e) => { cancelAnimationFrame(this._traf); this.setState({ tc: parseFloat(e.target.value) }); },
      tToggle: () => animTo(tPull > 0.5 ? 0 : 1),
      tToggleLabel: tPull > 0.5 ? "Pull out" : "Collapse",
      tLess: () => this.setState({ tn: Math.max(2, tN - 1) }),
      tMore: () => this.setState({ tn: Math.min(6, tN + 1) }),
      tnLabel: tN + " terms",
      tExpr: "\\sum_{k=1}^{" + tN + "} \\left(\\tfrac{1}{k} - \\tfrac{1}{k+1}\\right) = " + terms.join(" + "),
      tDone: tPull >= 0.9,
      tResult: "= 1 - \\tfrac{1}{" + (tN + 1) + "} = \\tfrac{" + tN + "}{" + (tN + 1) + "}"
    };
    const strands = STRANDS.map((name, si) => ({
      name,
      dotStyle: "width: 18px; height: 18px; border-radius: 999px; background: " + BRIGHT[si][3] + ";",
      topics: TOPICS.filter(t => t.strand === si).map(t => {
        const e = exCount(t);
        return {
          title: t.title, intro: t.intro, unit: t.unit,
          meta: lessonCount(t) + " lessons" + (e ? " · " + e + " examples" : ""),
          open: openTopic(t.id),
          cardStyle: "position: relative; overflow: hidden; background: " + BRIGHT[si][0] + "; border-radius: 28px; padding: 26.4px; cursor: pointer; transition: transform 0.18s ease, box-shadow 0.18s ease; box-shadow: var(--shadow-sm);",
          blobStyle: "position: absolute; width: 130px; height: 130px; border-radius: 999px; background: " + BRIGHT[si][1] + "; opacity: 0.7; right: -50px; top: -50px;"
        };
      })
    }));

    const tab = s.tab || (this.props.defaultTab ?? "Notes");
    const tabTint = { Notes: ["#ffd96a", "#5c3b00"], Video: ["#ffad94", "#7a1f08"], Practice: ["#c9b6ff", "#35208a"] };
    const tabs = ["Notes", "Video", "Practice"].map(t => ({
      label: t,
      select: () => this.setState({ tab: t }),
      style: "border: 0; font-family: var(--font-body); font-size: 15px; font-weight: 700; padding: 11px 30px; border-radius: 999px; cursor: pointer; background: " + (tab === t ? tabTint[t][0] : "transparent") + "; color: " + (tab === t ? tabTint[t][1] : "#645c50") + ";"
    }));

    const instant = this.props.instantFeedback ?? true;
    const qli = s.lessonIdx ?? 2;
    const qlt = s.lessonTopic || "vec3d";
    const QZ = qlt === "vec3d" ? (QUIZZES[qli] || QUIZ) : ((QUIZ_BANK[qlt] || (s.quizzes || {})[qlt] || {})[qli] || []);
    const pk = (qi) => (qlt === "vec3d" ? "" : qlt + "-") + qli + "-" + qi;
    const quiz = QZ.map((q, qi) => {
      const picked = s.picks[pk(qi)];
      const answered = picked !== undefined && instant;
      const ok = picked === q.correct;
      return {
        kicker: q.kicker || ("Question " + (qi + 1)),
        prompt: q.prompt,
        answered,
        feedback: ok ? q.right : q.wrong,
        feedbackStyle: "margin: 17.6px 0 0; font-size: 16px; line-height: 1.55; font-weight: 600; padding: 15px 17.6px; border-radius: 16px; background: " + (ok ? "#e1eecc" : "#ffe1d0") + "; color: " + (ok ? "#3d472b" : "#643312") + ";",
        options: q.options.map((o, oi) => {
          const isPicked = picked === oi;
          const reveal = answered && (isPicked || oi === q.correct);
          const good = oi === q.correct;
          let bg = "#f9f4ed", bd = "#dcd3c4", col = "#201e1d";
          if (reveal) {
            bg = good ? "#e1eecc" : "#ffe1d0";
            bd = good ? "#8fa073" : "#f6a06b";
            col = good ? "#3d472b" : "#643312";
          }
          return {
            label: o,
            pick: () => this.setState(prev => ({ picks: Object.assign({}, prev.picks, { [pk(qi)]: oi }) })),
            style: "text-align: left; font-family: var(--font-body); font-size: 16px; font-weight: 600; padding: 15px 22px; border-radius: 999px; cursor: pointer; background: " + bg + "; border: 2px solid " + bd + "; color: " + col + ";"
          };
        })
      };
    });
    const answeredCount = QZ.filter((q, qi) => s.picks[pk(qi)] !== undefined).length;
    const rightCount = QZ.filter((q, qi) => s.picks[pk(qi)] === q.correct).length;

    return {
      isHome: s.screen === "home",
      isTopic: s.screen === "topic",
      isCourse: s.screen === "course",
      goCourse,
      topic,
      exam,
      strands,
      courseSummary: TOPICS.length + " topics and " + TOPICS.reduce((a, t) => a + lessonCount(t), 0) + " lessons, grouped by strand.",
      isLesson: s.screen === "lesson",
      ...crossVals,
      ...telVals,
      hasCrossViz: LT === "vec3d" && li === 3,
      notesGridStyle: LT === "vec3d" && li === 3 ? "display: grid; grid-template-columns: minmax(0, 1fr) 400px; gap: 52px; align-items: start;" : "display: block;",
      lessonCrumb: "Lesson " + (li + 1),
      lessonKicker: "Lesson " + (li + 1) + " of " + VT.lessons.length,
      lessonTitle: VT.lessons[li][0],
      lessonIntro: LD.intro || [],
      hasIntro: !!(LD.intro && LD.intro.length),
      prevLesson: vPrev, nextLesson: vNext,
      prevLabel: li > 0 ? "Previous" : "Back to topic",
      nextLabel: li < VT.lessons.length - 1 ? "Next: " + VT.lessons[li + 1][0] : "Back to topic",
      onNotes3: isL3 && tab === "Notes", onVideo3: isL3 && tab === "Video", onPractice3: isL3 && tab === "Practice",
      onNotesG: !isL3 && tab === "Notes", onVideoG: !isL3 && tab === "Video", onPracticeG: !isL3 && tab === "Practice",
      gBlocks: isL3 ? [] : prep(LD.blocks, (LT === "vec3d" ? "vec" : LT) + "-l" + (li + 1)),
      lessonTopicTitle: VT.title, goLessonTopic, hasNotes: !!(LD.blocks && LD.blocks.length),
      gExamples: isL3 ? [] : (LD.examples || []).map((e, k) => { const ex = Array.isArray(e) ? { parts: e } : e; const pre = (LT === "vec3d" ? "vectors" : LT) + "-l" + (li + 1) + "-ex" + (k + 1); return { label: ex.label || ("Example " + (li + 1) + "." + (k + 1)), key: pre, parts: prep(ex.parts, pre) }; }),
      examplesCta: (LD.examples || []).length + " examples and questions for this lesson are on the Practice tab.",
      practiceLine: "From the Lesson " + (li + 1) + " notes. Practice: " + (VT.lessons[li][3] || ""),
      videoSrc: "lessons/" + (LT === "vec3d" ? "vectors" : LT) + "/lesson-" + (li + 1) + ".mp4",
      watch: (LT === "vec3d" ? WATCH[li] : (PROOF_WATCH[LT] || {})[li]) || [], hasWatch: !!(LT === "vec3d" ? WATCH[li] : (PROOF_WATCH[LT] || {})[li]),
      goHome: () => this.setState({ screen: "home" }),
      goTopic,
      goLesson,
      courseColumns: this.props.courseColumns ?? 2,
      courses,
      howto: [
        { n: "1", text: "Read the notes once without stopping. Confusion is allowed at this stage." },
        { n: "2", text: "Play with the interactive until you can predict what it will do before you drag." },
        { n: "3", text: "Do the practice questions. Wrong answers explain themselves." }
      ],
      prereqs: ["Vectors in two dimensions, including component form", "Basic trigonometry — the cosine rule especially", "Comfort with surds; magnitudes rarely come out neat"],
      lessons,
      tabs,
      onNotes: tab === "Notes",
      onVideo: tab === "Video",
      onPractice: tab === "Practice",
      workedSteps: [
        { tag: "Scalar product", text: "a · b = (3)(1) + (−1)(4) + (2)(−2) = 3 − 4 − 4 = −5", tagStyle: "font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #ffd96a; color: #5c3b00; text-align: center;" },
        { tag: "Magnitudes", text: "|a| = √14, |b| = √21", tagStyle: "font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #9fe0cf; color: #0b4a3e; text-align: center;" },
        { tag: "Angle", text: "cos θ = −5 / √294, so θ ≈ 106.9° — obtuse, as the negative dot product promised", tagStyle: "font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #ffad94; color: #7a1f08; text-align: center;" },
        { tag: "Scalar proj.", text: "a · b̂ = −5/√21 ≈ −1.09", tagStyle: "font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #c9b6ff; color: #35208a; text-align: center;" },
        { tag: "Vector proj.", text: "(−5/21)(i + 4j − 2k) — the shadow, pointing backwards along b", tagStyle: "font-size: 13px; font-weight: 700; padding: 5px 12px; border-radius: 999px; background: #9fe0cf; color: #0b4a3e; text-align: center;" }
      ],
      scene: this.buildScene(a, b, proj, s.yaw),
      yaw: s.yaw,
      setYaw: (e) => this.setState({ yaw: parseFloat(e.target.value) }),
      sliders,
      readouts: [
        { label: "a · b", value: this.fmt(dot) },
        { label: "angle θ", value: this.fmt(angle) + "°" },
        { label: "scalar proj", value: this.fmt(scalarProj) },
        { label: "|a| , |b|", value: this.fmt(ma) + " , " + this.fmt(mb) }
      ],
      sceneHint: dot > 0.01 ? "Acute angle — the green shadow points the same way as b." : (dot < -0.01 ? "Obtuse angle — the shadow has flipped and points along −b." : "Dot product is zero: these two are perpendicular."),
      chapters: [
        { t: "0:00", title: "Where the scalar product comes from" },
        { t: "2:40", title: "Component form, three examples" },
        { t: "5:55", title: "Deriving |a||b| cos θ with the cosine rule" },
        { t: "9:10", title: "Angles between vectors" },
        { t: "11:35", title: "Projections, and keeping the sign" }
      ],
      quiz,
      hasQuiz: QZ.length > 0,
      resetQuiz: () => this.setState(prev => { const p = Object.assign({}, prev.picks); QZ.forEach((q, qi) => delete p[pk(qi)]); return { picks: p }; }),
      goPractice: () => this.setState({ tab: "Practice" }),
      scoreLine: answeredCount ? rightCount + " of " + answeredCount + " right so far" : (["Zero", "One", "Two", "Three", "Four", "Five", "Six"][QZ.length] || QZ.length) + " questions. No score is recorded anywhere."
    };
  }
}

// Layout/lesson settings from the design (its "Tweaks"): change them here.
// ---------- Addresses, Back button and page titles ----------
// Every page has its own address, so Back/Forward, refresh and bookmarks work:
//   #/                                  home
//   #/specialist                        Specialist Maths course
//   #/specialist/vec3d                  a topic
//   #/specialist/vec3d/3                lesson 3 of that topic (Notes tab)
//   #/specialist/vec3d/3/practice       ...on the Practice (or video) tab
// Moving to a new page adds a history entry and starts at the top. Switching tabs
// only updates the address, so Back goes to the previous page, not the previous tab.
const COURSE_SLUG = "specialist";
const SITE_NAME = "The Proof Room";
const TABS = ["Notes", "Video", "Practice"];

function routeFromState(s, defaultTab) {
  if (s.screen === "course") return "/" + COURSE_SLUG;
  if (s.screen === "topic") return "/" + COURSE_SLUG + "/" + s.topicId;
  if (s.screen === "lesson") {
    const tab = s.tab || defaultTab;
    return "/" + COURSE_SLUG + "/" + s.lessonTopic + "/" + (s.lessonIdx + 1) +
      (tab && tab !== defaultTab ? "/" + tab.toLowerCase() : "");
  }
  return "/";
}

// Returns the state for an address, or the home page for anything unrecognised.
function stateFromRoute(hash, defaultTab) {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
  if (parts[0] !== COURSE_SLUG) return { screen: "home" };
  if (parts.length === 1) return { screen: "course" };
  const topic = TOPICS.find(t => t.id === parts[1]);
  if (!topic) return { screen: "course" };
  if (parts.length === 2) return { screen: "topic", topicId: topic.id };
  const n = parseInt(parts[2], 10);
  if (!(n >= 1 && n <= topic.lessons.length)) return { screen: "topic", topicId: topic.id };
  const tab = TABS.find(t => t.toLowerCase() === (parts[3] || "").toLowerCase()) || defaultTab;
  return { screen: "lesson", lessonTopic: topic.id, topicId: topic.id, lessonIdx: n - 1, tab };
}

function titleFromState(s) {
  const topic = id => TOPICS.find(t => t.id === id);
  if (s.screen === "course") return "Specialist Maths · " + SITE_NAME;
  if (s.screen === "topic") { const t = topic(s.topicId); return (t ? t.title + " · " : "") + SITE_NAME; }
  if (s.screen === "lesson") {
    const t = topic(s.lessonTopic), l = t && t.lessons[s.lessonIdx];
    return (l ? l[0] + " · " : "") + (t ? t.title + " · " : "") + SITE_NAME;
  }
  return SITE_NAME;
}

const pageKey = s => [s.screen, s.topicId, s.lessonTopic, s.lessonIdx].join("|");

class Site extends Component {
  constructor(props) {
    super(props);
    // Open on whatever page the address points at.
    if (location.hash) Object.assign(this.state, stateFromRoute(location.hash, this.defaultTab()));
    this.lastY = 0;
    this.restoreY = null;
    this.onScroll = () => { this.lastY = window.scrollY; };
    this.onRoute = () => {
      // Back/Forward: return to where you were on that page.
      this.restoreY = history.state && typeof history.state.y === "number" ? history.state.y : 0;
      const next = stateFromRoute(location.hash, this.defaultTab());
      if (routeFromState(next, this.defaultTab()) !== routeFromState(this.state, this.defaultTab())) this.setState(next);
      else this.restoreY = null;
    };
  }
  defaultTab() { return this.props.defaultTab ?? "Notes"; }
  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.addEventListener("scroll", this.onScroll, { passive: true });
    window.addEventListener("popstate", this.onRoute);
    window.addEventListener("hashchange", this.onRoute);
    history.replaceState(null, "", "#" + routeFromState(this.state, this.defaultTab()));
    document.title = titleFromState(this.state);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("popstate", this.onRoute);
    window.removeEventListener("hashchange", this.onRoute);
  }
  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate && super.componentDidUpdate(prevProps, prevState);
    const s = this.state, p = prevState || {};
    const route = "#" + routeFromState(s, this.defaultTab());
    const newPage = pageKey(s) !== pageKey(p);
    if (route !== location.hash) {
      if (newPage) {
        // Remember where we were on the page we're leaving, for Back.
        history.replaceState({ y: this.lastY }, "", location.hash);
        history.pushState({ y: 0 }, "", route);
      } else {
        history.replaceState(history.state, "", route);
      }
    }
    if (newPage) {
      const y = this.restoreY || 0;
      this.restoreY = null;
      // Wait a frame so the new page has laid out before scrolling into it.
      requestAnimationFrame(() => window.scrollTo(0, y));
      document.title = titleFromState(s);
    }
  }
}

mountApp(Site, document.getElementById("app"), {
  courseColumns: 2,       // columns in the Courses grid on the home page
  defaultTab: "Notes",    // which lesson tab opens first: "Notes", "Video" or "Practice"
  instantFeedback: true   // show right/wrong as soon as a quiz option is picked
});
