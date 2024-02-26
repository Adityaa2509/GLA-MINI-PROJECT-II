const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title: {
        type: String,
        required: true,
        unique: true,
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default:
          'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
      },
      category: {
        type: String,
        default: 'uncategorized',
      },
      slug: {
        type: String,
        required: true
      },
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }]
    },
    { timestamps: true })

    const Blog = mongoose.model('Blog',BlogSchema)

    module.exports = Blog