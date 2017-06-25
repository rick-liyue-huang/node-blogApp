
## Data-dictionary used to match some data names and rules between database and front-end

### For the admin data 
#### 1. mainpage:

    - banner:  
        banner_table 

            ID
            title:  varchar(64)
            description: varchar(600)
            href: varchar(300)

    - production-intro:
        intro_table

            ID 
            title: varchar(64)
            description: varchar(300)
            href: varchar(300)
    
    - user-evaluation:
        custom_evaluation_table

            ID 
            title: varchar(64)
            description: varchar(300)
            src: varchar(300)

#### 2. news:

    - news: 
        news_table

            ID 
            title: varchar(120)
            summary: varchar(500)
            icon_src: varchar(300)
            big_pic_src: varchar(300)
            content: text 

#### 3. about:
    - aboutus:
        aboutus_table

            ID 
            title: varchar(200)
            content: text 
            pic_src varchar(300)
            href: varchar(300)

#### 4. blog: 
    - blog
        blog_table

            ID 
            title: varchar(120)
            pic_src: varchar(300)
            pic_big_src: varchar(300)
            summary: varchar(500)
            content: text 
            post_time: timestamp
            author: varchar(32)
            n_view: init

#### 5.contact:
    -contact:
        contact_table

            ID 
            address:  varchar(200)
            phone: varchar(20) 
            fax: varchar(20) 
            email: varchar(64)
            followon: varchar(60) 
            twitter: varchar(60)
            map: ?

    - message:
        msg_table

            ID 
            name: varchar(32)
            email: varchar(64)
            phone: varchar(20)
            subject: text 

#### 6. admin:
    - admin:
        admin_table
            ID 
            username varchar(64)
            password varchar(32)  

### For the front interface

/get_banners
- [ID, title, description, href]

/get_custom_evaluations
- [ID, title, description, src]                  























