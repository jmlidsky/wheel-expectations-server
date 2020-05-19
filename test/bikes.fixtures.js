function makeBikesArray() {
    return [
        {
            id: 1,
            bike_name: 'First test bike',
            bike_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque?',
            bike_category: 'Road',
            bike_image: 'https://www.test1.jpg'
        },
        {
            id: 2,
            bike_name: 'Second test bike',
            bike_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
            bike_category: 'Hybrid',
            bike_image: 'https://www.test2.jpg'
        },        {
            id: 3,
            bike_name: 'Third test bike',
            bike_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
            bike_category: 'Mountain',
            bike_image: 'https://www.test3.jpg'
        },        {
            id: 4,
            bike_name: 'Fourth test bike',
            bike_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?',
            bike_category: 'Specialty',
            bike_image: 'https://www.test4.jpg'
        },
    ]
}

function makeMaliciousBike() {
    const maliciousBike = {
        id: 911,
        bike_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        bike_description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror='alert(document.cookie);'>. But not <strong>all</strong> bad.`,
        bike_category: 'Road',
        bike_image: 'https://www.maliciousbike.jpg'
    }

    const expectedBike = {
        ...maliciousBike,
        bike_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        bike_description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousBike,
        expectedBike,
    }
}

module.exports = {
    makeBikesArray,
    makeMaliciousBike,
}