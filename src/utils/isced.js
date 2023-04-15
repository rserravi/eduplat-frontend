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
        label: "Data Science",
        desc: "Data Science",
        tags: ["Big Data", "Binomial Distribution", "Business Intelligence","C++",        
            "Convolutional Neural Network", "Data Analytics" ,"Data Engineering",
            "Data Management","Data Mining", "Data Visualization","Databases",
            "Deep Learning", "Excel", "Google Power Searching", "IBM Watson", "Image Analysis",       
            "Image Processing", "Inference", "Keras","Machine Learning","Marketing Analytics",
            "Natural Language Processing","Neural Network", "NoSQL","NumPy","pandas","Power BI",        
            "Predictive Analytics","PyTorch", "R Programming", "Regression", "Relational Databases",              
            "Simulation","SQL","Statistics", "Stochastic Processes", "Technical Analysis",  
            "TensorFlow","TinyML"
        ],
    },
    {
        key:1,
        label: "Business",
        desc: "Business",
        tags: ["Entrepreneurship", "Business Comunication","Management", "Sales", "Business Strategy",
            "Operations", "Project Management", "Business law", "Business Intelligence", "Human Resources",
            "Industry", "E-Commerce", "Accounting", "Agile", "Crisis Resource Management",
            "Finance", "Marketing", "Grow Marketing", "Intellectual Property", "Negotiations", "Branding",
            "Leadership", "Lean", "Public speaking", "Remote work", "Storytelling", "Workplace Wellness",
            "Real Estate"
        ]
    },
    {
        key:2,
        label: "Computer Science",
        desc: "Computer Science",
    },
    {
        key:3,
        label: "Information Technology",
        desc: "Information Technology",
    },
    {
        key:4,
        label: "Language Learning",
        desc: "Language Learning",
    },
    {
        key:5,
        label: "Health and Nutrition",
        desc: "Health and Nutrition",
    },
    {
        key:6,
        label: "Fitness and Sport",
        desc: "Fitness and Sport",

    },
    {
        key:7,
        label: "    ",
        desc: "Personal Development",
        tags: ["Personal Transformation","Personal Productivity", "Leadership", "Career Development",
            "Parenting", "Relationships", "Hapiness", "Religion", "Spirituality", "Personal Brand", 
            "Creativity", "Influence", "Confidence", "Self Esteem", "Stress Management", "Memory",
            "Study Skills", "Motivation", "Meditation", "CBT Cognitive Behavioral Therapy", "EFT Emotional Freedom Techniques"
    ]
    },
    {
        key:8,
        label: "Physical Science and Engineering",
        desc: "Physical Science and Engineering",
    },
    {
        key:9,
        label: "Social Science",
        desc: "Social Science",
        tags: ["Abnormal Psychology","Area Studies","Behavioral Psychology","Child Development",
        "Civil Liberties","Economics","Foreign Policy","Gender Studies","Human Rights", "Media Studies",
        "Politics", "Psychology", "Sociology", "Women's Rights", 
        ]
    },
    {
        key:10,
        label: "Education and Pedagogy",
        desc: "Education and Pedagogy",
        tags: ["AP Courses", "College Preparation", "Educational Technology",       
            "Learning Skills", "Project-Based Learning", "Research Skills and Methods",                
            "Teacher Training", "Teaching Strategies"
        ]
    },
    {
        key:11,
        label: "Arts and Humanities",
        desc: "Arts and Humanities",
        tags: ["Anthropology","Christianity","Conflict Resolution","Geography","History",
            "International Relations","Islam","Judaism","Latin","Literature","Music","Mythology",
            "Philosophy","Sikhism","Spirituality","Writing", "Art History",
            "Animation","Architecture","Restoration","Cartography", "Creativity","Design",
            "Digital Content Creation","Drawing","Writing", "CGI", "Fashion", "Game Design",
            "UX Design", "Web Design", "Interior Design"
        ]
    },
    {
        key:12,
        label: "Math and Logic",
        desc: "Math and Logic",
    },
    {
        key:13,
        label: "Esoteric Practices",
        desc:"Esoteric Practices",
        tags:["Reiki", "Energy Healing", "Tarot", "Spiritual Healing", "Astrology", 
            "Hypnotherapy", "Psychic", "Chakra", "Shamanism"
        ]
    },
    {
        key:14,
        label: "Lifestyle",
        desc: "Lifestyle",
        tags:["Arts and Crafts", "Beauty and Makeup", "Food and Beverage", "Gaming", 
            "Home improvement", "Gardening", "Pet Care and Training", "Travel", "Meditation"

        ]
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

