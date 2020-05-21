function makePartsArray() {
    return [
        {
            id: 1,
            part_name: 'Part A',
            part_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque?',
            status: 'Essential',
        },
        {
            id: 2,
            part_name: 'Part B',
            part_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.',
            status: 'Essential',
        },        {
            id: 3,
            part_name: 'Part C',
            part_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.',
            status: 'Optional',

        },        {
            id: 4,
            part_name: 'Part D',
            part_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae accusamus veniam consectetur tempora, corporis obcaecati ad nisi asperiores tenetur, autem magnam. Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam?',
            status: 'Optional',
        },
    ]
}

function makeMaliciousPart() {
    const maliciousPart = {
        id: 911,
        part_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        part_description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror='alert(document.cookie);'>. But not <strong>all</strong> bad.`,
        status: 'Essential',
    }

    const expectedPart = {
        ...maliciousPart,
        part_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        part_description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
    }
    return {
        maliciousPart,
        expectedPart,
    }
}

module.exports = {
    makePartsArray,
    makeMaliciousPart,
}