export const iscedList = [
    {
        key:0,
        label: "ISCED0",
        desc: "Early childhood education",
    },
    {
        key:1,
        label: "ISCED1",
        desc: "Primary Education",
    },
    {
        key:2,
        label: "ISCED2",
        desc: "Lower Secondary Education",
    },
    {
        key:3,
        label: "ISCED3",
        desc: "Upper Secondary Education",
    },
    {
        key:4,
        label: "ISCED4",
        desc: "Post-secondary non-Tertiary Education",
    },
    {
        key:5,
        label: "ISCED5",
        desc: "Short-cycle tertiary education",
    },
    {
        key:6,
        label: "ISCED6",
        desc: "Bachelors degree or equivalent tertiary education",
    },
    {
        key:7,
        label: "ISCED7",
        desc: "Masters degree or equivalent tertiary education",
    },
    {
        key:8,
        label: "ISCED8",
        desc: "Doctoral degree or equivalent tertiary education",
    },
    {
        key:9,
        label: "OTHER",
        desc: "Others",
    }
]

export const categoriesList = [
    {
        key:0,
        label: "Arts",
        desc: "Arts",
        tags: ["Animation", "Architecture", "Basket weaving", "Calligraphy", "Cartooning", "Ceramics", "Character design", "Collage", "Comic book art", "Conceptual art", "Crocheting", "Dance", "Digital art", "Drawing", "Embroidery", "Fashion design", "Film", "Furniture design", "Graffiti art", "Glassblowing", "Illustration", "Installation art", "Jewelry making", "Knitting", "Literature", "Metalworking", "Mixed media", "Mosaic art", "Music", "Origami", "Painting", "Performance art", "Photography", "Poetry", "Pottery", "Printmaking", "Quilting", "Sculpture", "Street art", "Storyboarding", "Tattoo art", "Textile arts", "Theater", "Weaving", "Woodworking"
        ],
    },
    {
        key:1,
        label: "ICT",
        desc: "ICT",
        tags: ["Computer Science", "Software Engineering", "Database Management", "Information Systems", "Computer Networking", "Cybersecurity", "Artificial Intelligence", "Data Science", "Big Data Analytics", "Cloud Computing", "Internet of Things (IoT)", "Web Development", "Mobile Application Development", "Virtual Reality (VR)", "Augmented Reality (AR)", "User Experience (UX) Design", "Human-Computer Interaction (HCI)", "Digital Marketing", "E-commerce", "Project Management", "Information Architecture", "Content Strategy", "Technical Writing", "Computer Graphics", "Computer Vision", "Natural Language Processing (NLP)", "Machine Learning", "Blockchain", "Quantum Computing"
        ]
    },
    {
        key:2,
        label: "Languages",
        desc: "Languages",
        tags:["American Sign Language (ASL)", "Arabic", "Basque", "Bengali","Catalan", "Danish", "Dutch", "English", "Esperanto", "Finnish", "French", "Galician", "German", "Greek", "Hebrew", "Hindi", "Indonesian", "Italian", "Japanese", "Korean", "Latin", "Malayalam", "Mandarin", "Norwegian", "Portuguese", "Punjabi", "Russian", "Spanish", "Swahili", "Swedish", "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Urdu", "Vietnamese", "Zulu"
        ]
    },
    {
        key:3,
        label: "Maths",
        desc: "Maths",
        tags: ["Abstract algebra", "Algebra", "Calculus", "Combinatorics", "Control theory", "Differential equations", "Field theory", "Functional analysis", "Game theory", "Geometry", "Graph theory", "Group theory", "Information theory", "Linear algebra", "Logic", "Number theory", "Numerical analysis", "Optimization", "Probability theory", "Ring theory", "Set theory", "Statistics", "Topology", "Trigonometry"
        ]
    },
    {
        key:4,
        label: "Natural Sciences",
        desc: "Natural Sciences",
        tags: ["Astronomy", "Biology", "Chemistry", "Earth science", "Ecology", "Environmental science", "Geology", "Meteorology", "Physics", "Zoology"
        ]
    },
    {
        key:5,
        label: "Social Sciences",
        desc: "Social Sciences",
        tags:["Anthropology", "Archaeology", "Communication studies", "Criminology", "Demography", "Economics", "Geography", "History", "International relations", "Linguistics", "Law", "Library science", "Pedagogy", "Political science", "Psychology", "Sociology", "Social work"
        ]
    },
    {
        key:6,
        label: "Health",
        desc: "Health",
        tags:["Acupuncture", "Art therapy", "Aromatherapy", "Ayurvedic medicine", "Behavioral health", "Cardiology", "Chiropractic", "Clinical nutrition", "Dietetics", "Drama therapy", "Endocrinology", "Exercise physiology", "Gastroenterology", "Geriatrics", "Gynecology", "Herbal medicine", "Homeopathy", "Massage therapy", "Meditation", "Music therapy", "Naturopathy", "Nephrology", "Neurology", "Nutrition", "Occupational therapy", "Oncology", "Pediatrics", "Physical therapy", "Psychiatry", "Psychology", "Public health nutrition", "Reflexology", "Respiratory therapy", "Speech therapy", "Sports medicine", "Sports nutrition", "Traditional Chinese medicine", "Yoga therapy"
        ]

    },
    {
        key:7,
        label: "Psychopedagogy",
        desc: "Psychopedagogy",
        tags: ["Behavioral psychology", "Cognitive psychology", "Constructivism", "Critical pedagogy", "Developmental psychology", "Educational psychology", "Emotional intelligence", "Experiential education", "Inclusive education", "Learning styles", "Learning theories", "Mindfulness education", "Motivation psychology", "Multiple intelligences theory", "Neuroeducation", "Pedagogy of autonomy", "Positive psychology", "Social psychology", "Special education"
        ]
    },
    {
        key:8,
        label: "Tools",
        desc: "Tools",
        tags: ["No subcategory"]
    },
    {
        key:8,
        label: "Various Categories",
        desc: "Various Categories",
        tags:["No Subcategory"]
    },
    {
        key:9,
        label: "Other Categories",
        desc: "Other Categories",
        tags: ["No Subcategory"]
    }
]

export const getTagsFromCategory = (label) =>{
    var result = ""
  
    if (label!==""){
        //console.log("TAGS FROM CATEGORY", label)
        const found = categoriesList.find(( element ) => element.label === label);
        result = found.tags
        //console.log("FOUND TAGS", found.tags)
    }
    

    return result;
}

export const getIscedFromCode = (code)=>{
    const found = iscedList.find((item)=>{return item.label === code; })
    
    return found.desc;
}
