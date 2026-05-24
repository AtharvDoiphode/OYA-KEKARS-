const https = require('https');
const fs = require('fs');

const data = [
  {
    id: "DTRqZ7yCC9d",
    url: "https://scontent.cdninstagram.com/v/t51.82787-15/612381624_17906870853338317_884434170813467292_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=xoPSL1ni3MEQ7kNvwF6Lgc4&_nc_oc=AdpfFaqRyk6K6GR0AbvHxiGXfUkWvgOAG9HRXQIUM98VlQRHBALcRHTIX0JLVWGzr8M&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=vy6--JiR2QnRyg3SCWOauA&_nc_ss=70689&oh=00_Af6_z7kuJQCXOZiYpVaCwKCPxlchLR49FyvI1kBIwqRe7Q&oe=6A193C23"
  },
  {
    id: "DSmlEHYDeys",
    url: "https://scontent.cdninstagram.com/v/t51.82787-15/604725846_17904749226338317_1305447000973787031_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=29_xfol2ETYQ7kNvwFnCsVL&_nc_oc=Ado8Ud-Ygd0s1oyivOtLEbYHl9PM9OB_RYmLmIH8dcnXCPiN0zYJmgyGMOBSeuHQGRI&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1JsMU8EWKj3mPBImP6Xouw&_nc_ss=70689&oh=00_Af6fXKdDxmeYBv64rpgkGU8sIV5bORUvRBpmgvRSFbT3XQ&oe=6A194DAE"
  },
  {
    id: "DPRjljijXX_",
    url: "https://scontent.cdninstagram.com/v/t51.71878-15/557431203_2735932906611650_2453863029072665395_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=Rwr8XfDo7lYQ7kNvwFffS0L&_nc_oc=AdrRbYV92hs3yT1tU4DsrQ3kiRPMS_6BLkvXCXcWive5BWlP3-QLsdxYIk_DVjKJ5qE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=MYyJiZjzEszWatbGP6wWUQ&_nc_ss=70689&oh=00_Af4GNZHS-YN475q8STBGU0UoIHs0nbsCzrb2XAWdg96fBQ&oe=6A192703"
  }
];

if (!fs.existsSync('frontend/public/assets/reels')) {
    fs.mkdirSync('frontend/public/assets/reels', { recursive: true });
}

data.forEach(item => {
    https.get(item.url, res => {
        const file = fs.createWriteStream(`frontend/public/assets/reels/${item.id}.jpg`);
        res.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${item.id}.jpg`);
        });
    });
});
