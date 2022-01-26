const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seed() {
    await Promise.all(
        postInitialPosts().map(post => {
            return prisma.post.create({ data: post })
        })
    )
}

seed()

function postInitialPosts() {
    return [
        {
            title: "post1",
            body: "lalala siuuu lalala siuuu",
        },
        {
            title: "post2",
            body: "lalala siuuu lalala siuuu",
        },
        {
            title: "post3",
            body: "lalala siuuu lalala siuuu",
        },
    ]



}