
const EGZERSIZLER = [
    {
        id: 0,
        isim: 'Atlama Krikoları',
        talimat: 'Bacaklarınla zıpla ve bacaklarını yanlara doğru açınız ve ellerininizi başının üstünde birnirine değdirin, sonra eski pozisyonuna dön ayaklar birleşik ve kollar yanda.',
        metDegeri: 8,
        gif: 'https://www.icegif.com/wp-content/uploads/icegif-134.gif',
        youtubeLink: 'https://youtu.be/yDSMdd8hiFg'
    },
    {
        id: 1,
        isim: 'Yarım Mekik (Crunch)',
        talimat: 'Sırtüstü dizler kırık bir şekilde durunuz, sırtınınızı yerden havaya kaldırıp indiriniz.',
        metDegeri: 9,
        gif: 'https://www.verywellhealth.com/thmb/uo9bK8tRuKub-dX9u6OtN1W20gM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-1-2696610-AbdominalCrunch01-1853-5991f723af5d3a00114a1d7f.gif'
    },
    {
        id: 2,
        isim: 'Dağ Tırmanışı',
        talimat: 'Şınav pozisyonunda bacaklarınızı karın bölgesine kadar çekin.',
        metDegeri: 8,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTc2NTE1YjQ3NTQ5NzI2YjBhM2IwOThmZTE4OWQwMThkMThhMmRkZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/w8wFWRqX7oFTIcLVnW/giphy.gif'
    },
    {
        id: 3,
        isim: 'Topuğa Dokunma',
        talimat: 'Sırtınızı düz tutun ve ayaklarınız yere sıkıca basarken dizlerinizi 90 derecelik bir açıyla bükün. Sağ elinize sağ ayak bileğinize ulaşmak için omurganızı bükerken merkez bölgenizi devreye sokun. Bu hareketi sol tarafınızda tekrarlayın, her tekrar arasında tarafları değiştirin.',
        metDegeri: 10,
        gif: 'https://media.giphy.com/media/y1QKWuIknBJgcUuols/giphy.gif'
    },
    {
        id: 4,
        isim: 'Plank',
        talimat: 'Şınav pozisyonunda kollarınız ve ayak parmaklarınız yerde olacak şekilde yüzünüz aşağı dönük, dirsekleriniz doğrudan omuzlarınızın altındadır.',
        metDegeri: 4,
        gif: 'https://media.giphy.com/media/Fin3SkrAFg5GavbfzB/giphy.gif'
    },
    {
        id: 5,
        isim: 'Kobra Gerinmesi',
        talimat: 'Kollar dirseklerden kırık ve ellerinizi de ensenizde birleştirin. Üst göğüs bölgesini yukarıya doğru kaldırıp esneyin ve yavaşça göğsünüzü yere doğru indirin.',
        metDegeri: 2.3,
        gif: 'https://www.fitnessrobust.com/wp-content/uploads/2021/09/Bhujangasana.gif'
    },
    {
        id: 6,
        isim: 'Bel Omuru Dönerek Gerdirme Sol',
        talimat: 'Sol bacağınızı yukarı kaldırın ve sol dizinizi sağa çekmek için sağ elinizi kullanın ama diğer kolunuzu yerin üzerinde yan tarafa uzatılmış halde tutun.',
        metDegeri: 1,
        gif: 'https://i.ytimg.com/vi/BzYBkAvdCJY/maxresdefault.jpg'
    },
    {
        id: 7,
        isim: 'Bel Omuru Dönerek Gerdirme Sağ',
        talimat: 'Sağ bacağınızı yukarı kaldırın ve sağ  dizinizi sola çekmek için sol elinizi kullanın ama diğer kolunuzu yerin üzerinde yan tarafa uzatılmış halde tutun.',
        metDegeri: 1,
        gif: 'https://i.insider.com/5fa2d5d569331a0011bc73e7?width=750&format=jpeg&auto=webp'
    },
    {
        id: 8,
        isim: 'Russian Twist',
        talimat: 'Gövde geriye hafif eğiniz dizler bükük ayaklar bitişik eller kollardan gergin düz göğüs hizasında Pozisyon korunarak gövdeden sağa sola kontrollü dönünüz.',
        metDegeri: 9,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmRiNzQ0OTcwNWNmYzY2NjkzMDQ4ZDcxNDMzODFkYjY1MWIxMGQ4NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/cpKD9u3S25xYL8tcbr/giphy.gif'
    },
    {
        id: 9,
        isim: 'Bacak Kaldırma',
        talimat: 'Sırt üstünde yere uzanın ve ellerinizi destek almak için kalça hizanızda yere koyun sonra bacaklarınızı dümdüz bir biçimde yerle bir dik açı oluşturana kadar kaldırın ve bacaklarınızı yavaşça yere koyun ve bunu tekrarlayın',
        metDegeri: 8,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWY0ZGM4NjMwNzEyMDM5ZmM3ZmRhZDg5NDE5ZjgwOTkwNTU2M2U3NyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/F0ivb1xuHONykLfgXm/giphy.gif'
    },
    {
        id: 10,
        isim: 'Köprü Hareketi',
        talimat: 'Ayaklarnızı kalça hizasında açık tutunuz, ellerizi ve kollarınızı yanlara düz olacak biçimde yerleştiriniz ve belinizi yavaşça yukarıya doğru kaldırılıp tekrar aşağıya doğru indiriniz.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTgxOTI3YmI3ODBlZTgwZTIzMGQyMjhhM2MzMTEyOTVkMzA2YTg3MiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/jAyTdla4ZS1g3MW4JW/giphy.gif'
    },
    {
        id: 11,
        isim: 'Yan Köprü Sağ',
        talimat: 'Sol tarafınıza yatın. Dirseğinizi doğrudan omuzlarnızın altına ve sağ elinizi belinize koyun. Sağ bacağınızı sol bacağınızın üzerine yerleştirin. Kalçalarınızı yukarı kaldırın, 2-4 saniye yukarıda tutun sonra başlangıç pozisyonunuza geri gidin.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWU5OTU2OGMzNGY3NzRmNDgwNmI1OWM0ZGQ2MTllMGY4ZGZmMzgzNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/FUVJF2a0xCxhlMsBBx/giphy.gif'
    },
    {
        id: 12,
        isim: 'Yan Köprü Sol',
        talimat: 'Sağ tarafınıza yatın. Dirseğinizi doğrudan omuzlarnızın altına ve sol elinizi belinize koyun. Sol bacağınızı sağ bacağınızın üzerine yerleştirin. Kalçalarınızı yukarı kaldırın, 2-4 saniye yukarıda tutun sonra başlangıç pozisyonunuza geri gidin.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTg4NTY1MzJjOGJlODM3OTNhZGRhZGJiNWI1MDI4ODBiMjg5MjE2OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/DXfTUSDACr1oELZYP6/giphy.gif'
    },
    {
        id: 13,
        isim: 'Yukarı V Hareketi',
        talimat: 'Sağ tarafınıza yatın. Dirseğinizi doğrudan omuzlarnızın altına ve sol elinizi belinize koyun. Sol bacağınızı sağ bacağınızın üzerine yerleştirin. Kalçalarınızı yukarı kaldırın, 2-4 saniye yukarıda tutun sonra başlangıç pozisyonunuza geri gidin.',
        metDegeri: 9,
        gif: 'https://s3.amazonaws.com/photography.prod.demandstudios.com/582765cd-fd20-408c-aec3-8187f3848a2a.gif'
    },
    {
        id: 14,
        isim: 'Yan Planklı Şınav',
        talimat: 'Klasik şınav pozisyonunda başlayınız, yukarı kalktığınız zaman sağ kolunla birlikte vücudunun üst kısmını çeviriniz aynısını diğer taraf için yapıp tekrar ediniz.',
        metDegeri: 9,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2QyZjMxYjJkNGM4NzUzYjM3OWNmYWFiMTFjYzljYzEwNjMzYzUxNCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/pJxpLTczaMeExw0y2G/giphy.gif'
    },
    {
        id: 15,
        isim: 'Bisiklet Crunch',
        talimat: 'Bisiklet pedalı çevirir gibi bacaklarınızla üst vücudunuzu uyum içinde hareket ettiriniz.Gövdenizi tüm rotasyonu yapmalısınız. Kalçalarınızı hareketi yaparken dönmemeli, bacaklarınızı düz ileri ve geri hareket ettiriniz.',
        metDegeri: 10,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmNkNWVjYzI2ZDY2NDM0M2ZlYTQ4OWI2ZDQzYjM4NDQwNmQ5ODZmNCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/8eVdTjze0KOqNCrCmY/giphy.gif'
    },




    {
        id: 16,
        isim: 'Mekik',
        talimat: 'Sırt üstü yatınız, yattıktan sonra dizlerinizi bükünüz ve ellerinizi ensede birleştiriliriniz ve yukarı kalkıp ininiz.',
        metDegeri: 8,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmNiNjE1NzIzMDM2YWZlNmUzOWZkYjY5NmFhY2UzYzI1NTU5MWM0ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/QJTimfvkBYxNSHHxFt/giphy.gif'
    },
    {
        id: 17,
        isim: 'Dizden Şınav',
        talimat: 'Diziniz yere temas halindeyken ayaklarınız havada olacak şekilde şınav çekiniz.',
        metDegeri: 8,
        gif: 'https://i.pinimg.com/originals/15/6a/d0/156ad00c5421e2cea7a49abf3c602f37.gif'
    },
    {
        id: 18,
        isim: 'Kedi İnek Duruşu',
        talimat: 'Ellerinizi, parmaklarınız vücudunuza bakacak şekilde mata yerleştirin. Başınızı aşağı eğip omurganızı iyice açarken nefes alın, omurganızı düzleştirip hafifçe yukarı bakarken nefes verin.',
        metDegeri: 3,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGY1NGIyZmJjZGE2NTFlNDZkNWU0YjE5YmEzZTIwMzIyNzc3MTFhMCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/tl2tDPRgON649kdZYa/giphy.gif'
    },
    {
        id: 19,
        isim: 'Çocuk Duruşu',
        talimat: 'Ayaklar birleştirilir, dizler bükülür ayakların üstü yere gelecek şekilde yan yana konur ve kalça topukların üzerine yavaşça yerleştirilerek bacakların üzerine oturulur. Eller bacakların üzerine konur. Bu pozda derin nefes alınır yavaş yavaş nefes verilirken eller yardımıyla öne doğru eğilinir.',
        metDegeri: 3,
        gif: 'https://www.sralab.org/sites/default/files/inline-images/childs%20pose.jpg'
    },
    {
        id: 20,
        isim: 'Kol Makası',
        talimat: 'Ayaklarınzı omuz genişliğinde açık biçimde dik şekilde ayakta durun. Kollarınızı "X" harfi biçiminde önünüzde birleştirin ve tekrar açın.',
        metDegeri: 2,
        gif: 'https://i.pinimg.com/originals/05/db/6a/05db6a8f3bf2038b832fe1350543dbd9.gif'
    },
    {
        id: 21,
        isim: 'Kolu Yana Kaldırma',
        talimat: 'Ayaklarınızı omuz hizasında açarak ayakta durun ve avuç içleriniz öne bakacak şekilde ellerinizi yanınızda tutun, kollarınızı omuz hizasında olacak şekilde yukarı ve yanlara doğru kaldırın.',
        metDegeri: 2,
        gif: 'https://www.verywellfit.com/thmb/gtxAQHluqGFoFoLUdQmcXhvYAEI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/61-4588211-dumbell-Lateral-side-Raise-GIF-7858592bcda347a9adf46886c5106e73.gif'
    },
    {
        id: 22,
        isim: 'Tırtıl Yürüyüşü',
        talimat: 'Ayaklarınzı omuz genişliğinde açık biçimde başlayın. Vücudunuzu eğin ve ellerinizi ön tarafa doğru olabildiğince yürütün, sonra ellernizi geri yürütün.',
        metDegeri: 5,
        gif: 'https://hips.hearstapps.com/hmg-prod/images/766/fitgif-friday-inchworm-slider-thumbnail-override-1494598321.gif'
    },
    {
        id: 23,
        isim: 'Yüzücü',
        talimat: 'Yere yüzü koyun uzanı, bacaklarınızı ve kollarınızı ileri doğru gerin, kollarınızı ve bacaklarınızı kaldırın, yüzüyormuş gibi, sağ kol – sol bacak, sol kol – sağ bacak şeklinde çapraz olarak kol ve bacaklarınızı kaldırıp indirin.',
        metDegeri: 5,
        gif: 'https://sporium.net/wp-content/uploads/2021/01/swimming.gif'
    },
    {
        id: 24, 
        isim: 'Yatık Halde Romboid Sıkma',
        talimat: 'Yere dizlerini büküp oturun, vücudunuzun üst kısmı hafif geriye doğru eğin, kollarınızı önünüze doğru uzatın sonra dirseklerinizi 90 derecelik açı yapasaya kadar geri çekin, bunu tekrarlayın.',
        metDegeri: 4,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2NlMmY4YzFhZmJiNjNjYzFlMWEwZWJkZWI3Mzg1MmJkMjJiOWZlZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/Qy6zDkPMW75V2ISsej/giphy.gif'
    },
    {
        id: 25, 
        isim: 'Yüzüstü Triceps Kas Şınavı',
        talimat: 'Elleriniz omuzlarınızın altında ve dirsekleriniz bükük halde karnınızın üstüne yatın. Göğsünüzü hafifçe yukarı kaldırın ve başlangıç pozisyonunuza geri dönün, bunu tekrarlayın.',
        metDegeri: 4,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTUxYmMzMGZmODA0YTExYTA0NTIzMjE3ZGQxMWFmZmE5MmRlOTc3YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/jCN0EpiX3IAR6Spl4Q/giphy.gif'
    },
    {
        id: 26, 
        isim: 'Arka Kol Geri Açma',
        talimat: 'İleriye doğru eğilin, dizlerinizi ve dirseklerinizi bükün. Kollarınızı uzatın ve kol kaslarınızı sıkın ve ileri geri haraket ettirin (dumbell kullanmak zorunda değilsiniz).',
        metDegeri: 3,
        gif: 'https://www.fitnesscim.com/wp-content/uploads/2019/05/triceps-two-arm-dumbbell-kickback.gif'
    },
    {
        id: 27, 
        isim: 'Incline Şınav',
        talimat: 'Normal şınav pozisyonu alın fakat ellerini bir sandalye veya bir yüksek bir nesne üzerinde olsun. Vücudunuzu kol gücünüzden destek alarak yukarı aşağı haraket ettirin.',
        metDegeri: 5,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWMyMjE5MjI3NTdmMDg4ZDI5Mzk4NmQ4NjU2ZWM5NzY3MGE3OTU2ZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/V2cXOnHIPkXIbcVch3/giphy.gif'
    },
    {
        id: 28, 
        isim: 'Y-Süpermen',
        talimat: 'Yerde kollarınız tam olarak uzatılmış ve baş parmaklarınız yukarı işaret eder biçimde yüzüstü yatın, vücudunuz Y harfi biçimde olmalıdır. Kollarınızı yerden olabildiğince yukarı kaldırın ve kollarınızı 2 saniye boyunca tutun. Yavaşça başlangıç pozisyonunuza dönün ve bunu tekrarlayın.',
        metDegeri: 5,
        gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/08/supermany-1472154643.gif'
    },
    {
        id: 29, 
        isim: 'Hiper Uzanma',
        talimat: 'Ayak parmaklarınız yere dokunur hâlde ve çeneniz elinizin üzerinde olacak şekilde karnınızın üstüne yatın. Göğsünüzü yerden olabildiğince yukarı kaldırın. Birkaç saniye boyunca bu pozisyonda kalın ve sonra başlangıç pozisyonuna dönün.',
        metDegeri: 5,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGVjZTNhNmQxMmU0YzE1MGM5ZDFjYWU1NTMyNGY3YTJkM2I0ZWMyZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/nHyL5fFYzb75X0xNPY/giphy.gif'
    },
    {
        id: 30, 
        isim: 'Sandalye Dip Triceps',
        talimat: 'Kalça ve bacaklarınızı sandalyenin önünde tutarak sandalyeye elinizle basarak çökün. Sırtınız sandalyeye yaklaştığında dirseğinizi 90 derece bükülene kadar aşağıya inmeye çalışın.',
        metDegeri: 6,
        gif: 'https://thumbs.gfycat.com/FittingImpassionedAmethystinepython-max-1mb.gif'
    },
    {
        id: 31, 
        isim: 'Sırtüstü Şınav',
        talimat: 'Ayaklarınız yerin üzerinde düz ve kollarınız iki tarafa bükülü hâlde sırt üstü uzanın. Göğsünüzü olabildiğince yukarı itin ve sonra yavaşça başlangıç pozisyonuna dönün.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmQzMThiMGQ2NGY4MzMzOGFiMzUyODFmNTU2Y2JhYTQ0MTllZjdjZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/yJDdG3aaZWzn3OBVqL/giphy.gif'
    },

    {
        id: 32, 
        isim: 'Yerden Yan Yatarak Sola Gerinme Haraketi',
        talimat: 'Sağ diziniz önünüzde hafifçe bükülü ve sol bacağınız sağ bacağınızın arkasında uzatılmış hâlde sağ tarafınıza yatın. Sol kolunuzu kafanızın üzerinden doğrultun ve vücudunuzun sol tarafını germek için hafifçe sol bileğinizi çekin. Birkaç saniye boyunca bu pozisyonda kalın.',
        metDegeri: 2,
        gif: 'https://i.ibb.co/k3szVKq/Ads-z.png'
    },
    {
        id: 33, 
        isim: 'Yerden Yan Yatarak Sağa Gerinme Haraketi',
        talimat: 'Sol diziniz önünüzde hafifçe bükülü ve sağ bacağınız sol bacağınızın arkasında uzatılmış hâlde sol tarafınıza yatın. Sağ kolunuzu kafanızın üzerinden doğrultun ve vücudunuzun sağ tarafını germek için hafifçe sağ bileğinizi çekin. Birkaç saniye boyunca bu pozisyonda kalın.',
        metDegeri: 2,
        gif: 'https://i.ytimg.com/vi/m1UGG7rzBtE/maxresdefault.jpg'
    },
    {
        id: 34, 
        isim: 'Yerde Triseps Dip',
        talimat: 'Dizleriniz bükülü ve ayaklarınız yere tam basar şekilde yere oturun. Ellerinizi omuzun altında, parmaklarınız kalçalarınızı işaret edecek şekilde yere koyun. BEN Kalçalarınızı yerden kaldırın. Daha sonra kalçalarınızı indirip kaldıracak şekilde dirseklerinizi bükün ve genişletin.',
        metDegeri: 6,
        gif: 'https://i.pinimg.com/originals/c0/b8/aa/c0b8aad68072beb05fc9f8be3e390f62.gif'
    },
    {
        id: 35, 
        isim: 'Havada Zikzak Şınav',
        talimat: 'Şınav pozisyonunda başlayın. Kendinizi alçaltın, vücudunuzu önce sola sonra sağa kaydırın. Vücudunuzu yukarı kaldırın ve egzersizi tekrarlayın.',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWI4ZGE4MTY1ZDEzYzExMDRlZGY0MjcxN2I5OTBlYTM0NGRmZGFiMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/U15evLNG5xjxtTreqd/giphy.gif'
    },
    {
        id: 36, 
        isim: 'Pike Şınav',
        talimat: 'Elleriniz ve ayaklarınız yerde başlayın. Ellerinizi omuz genişliğinde koyun. Vücudunuzu eğin ve kalçalarınızı ters bir ‘V’ biçiminde yukarı kaldırın. Dirseklerinizi bükün ve kafanızı yere yaklaştırın. Vücudunuzu geriye itin ve egzersizi tekrarlayın.',
        metDegeri: 6,
        gif: 'https://i.pinimg.com/originals/e0/fd/94/e0fd94a9f667586eede4471b1993ad67.gif'
    },
    {
        id: 37, 
        isim: 'Ters Kar Meleği',
        talimat: 'Kollarınız iki yanınızda olacak biçimde karnınızın üzerinde yatın. Kollarınızı yukarı kaldırın ve kollarınızı baş parmaklarınıza değecek biçimde kafanızın üzerinde uzatın. Sonra onları yavaşça ilk konuma getirin ve egzersizi tekrarlayın.',
        metDegeri: 4,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODllM2M3NjYwYzg3OGMwM2ZlNmJiMmJmNzVhZmU4ZjQ3OWUwMWEyZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/4CzHSH76RGmR1eVhgN/giphy.gif'
    },




    {
        id: 38, 
        isim: 'Şınav',
        talimat: 'Vücudunu düz tut ve kollarınla vücudunu yükselt ve indir. Bu egzersiz göğüs, omuz, triceps, sirt ve bacakları çalıştırır.',
        metDegeri: 9,
        gif: 'https://media.tenor.com/gI-8qCUEko8AAAAC/pushup.gif'
    },
    {
        id: 39, 
        isim: 'Geniş Kol Şınavı',
        talimat: 'Normal şınav pozisyonu alın ancak elleriniz arasındaki mesafe omuzlarınızdan daha geniş olsun. Daha sonra vücudunuzu yukarı aşağı hareket ettirin. Gövdenizin bir hizada olması gerektiğini unutmayın.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWFmZDdlN2M4Y2IzZTJmNjE2NDFkYmNjYWJmY2UzYTQxZDhhODZlMyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ZfxdqOYSsSBZK1YCnc/giphy.gif'
    },
    {
        id: 40, 
        isim: 'Omuz Germe',
        talimat: 'Bir kolunuzu yere paralel olarak vücudunuz boyunca uzatıp diğer kolunuzla paralel kolu göğsünüze doğru çekin. Bir süre tutun, kolları değiştirin ve egzersizi tekrarlayın.',
        metDegeri: 2,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjY0ZjQ4YjFhYzVmNjE0ZjlhYjBiM2Y0ZGMzYmY3N2Y2MDIzNjBjOSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/z3GcKeITKk5xnK7rIS/giphy.gif'
    },
    {
        id: 41, 
        isim: 'Göğüs Germe', //calfs stretch olarak geçiyor
        talimat: 'Bir kapı aralığı bulun, kollarınız kapı pervazında ve dirsekleriniz omuzlarınızdan biraz aşağıda olacak şekilde hamle pozisyonu alın, sonra göğsünüzü yavaşça öne getirin. Bu pozisyonda 30-40 saniye durun. Sonra yavaşça bu pozisyondan çıkın, kollarınızı aşağı indirin ve birkaç omuz döndürme hareketi yapın.',
        metDegeri: 3,
        gif: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-961504432-min-1-1670416614.jpg'
    },
    {
        id: 42, 
        isim: 'Decline Şınav', 
        talimat: 'Dizleriniz ve kalça ve elleriniz de omuz hizasında olacak şekilde dört ayak pozisyonu alın. Daha sonra ayaklarınızı bir sandalye veya yüksek bir şey üzerine kaldırın ve vücudunuzu kol gücünüzden destek alarak yukarı aşağı hareket ettirin.',
        metDegeri: 4,
        gif: 'https://hips.hearstapps.com/hmg-prod/images/workouts/2016/03/feetelevatedpushup-1457047025.gif?crop=1xw:0.75xh;center,top&resize=1200:*'
    },
    {
        id: 43, 
        isim: 'Yamuk Şınav', 
        talimat: 'Normal şınav pozisyonu alın ancak bir eliniz diğer elinizden önde olsun. Daha sonra bir şınav çekin ve diğer elinizi öne alarak pozisyon değiştirin. Gövdenizin bir hizada olması gerektiğini unutmayın.',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGJhZWJmZmVjNmNmMDEwNDgxYzUzYzdhZjM3ZTUxYTg3OWRhMGY0YyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/wmpeaYYdHrULq3jEXc/giphy.gif'
    },
    {
        id: 44, 
        isim: 'Elmas Şınav',
        talimat: 'Dizleriniz ve kalça ve elleriniz de omuz hizasında olacak şekilde dört ayak pozisyonu alin. İşaret ve baş parmaklarınızı bir araya getirip göğsünüzün altında bir elmas işareti oluşturun ve daha sonra vücudunuzu yukarı aşağı hareket ettirin.',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzRlYzZmZGY3MTI2ZDEzZTU5NTYyMmRmZTM3YTUxOGY2NmVmNWYwMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/evPKAappO9Z2HoLHE6/giphy.gif'
    },
    {
        id: 45, 
        isim: 'Hindu Şınav',
        talimat: 'Elleriniz ve ayaklarınız yere temas ederken kalçalarınızı havaya doğru bükülü bir şekilde pozisyon alın. Ters çevrilmiş bir “V” harfi gibi. Daha sonra vücudunuz yere gelecek şekilde dirseklerinizi bükün. Vücudunuz yere yakınken, vücudunuzun üst kısmını mümkün olduğunca fazla yukarı kaldırın daha sonra ilk başlangıç pozisyonunuza geri dönün ve hareketi tekrarlayın.',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDEyODY4ODJkMzJhYjdhMDRkYjYwNWE0ODI4NTJjYjVkZWQ5OGIyYyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/H3MwSUWpVEzPHnenvU/giphy.gif'
    },
    {
        id: 46, 
        isim: 'Burpee',
        talimat: 'Bir ayakta pozisyonu ile başlayın. pozisyonlar çömelme tutun ve yere ellerini koymak. Aynı zamanda bacaklarınızı ve kollarınızı düzeltin. Hemen bodur pozisyonlar dönün. Bir ağız kavgası pozisyonlar itibaren yukarı atlamak.',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2MyYzYyY2ZkYmVlYmQyN2QxZWI1MWY5N2I2YzRmMTdhYzZmMzY0NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3N5nEdkvo8QtVuyoUw/giphy.gif'
    },
    {
        id: 47, 
        isim: 'Örümcek Adam Şınavı',
        talimat: 'Normal şınav pozisyonuyla başlayın. Gövdenizi aşağı doğru hareket ettirirken bacağınızın birini yana doğru bükün ve kaldırın. ( Daha sonra başlangıç pozisyonunuza dönün ve diğer yandaki bacağınızla aynı hareketi tekrarlayın.',
        metDegeri: 8,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGQ4NjVjNTRjMDM2MWU1NGIzMmIwYjkzZTZlMDZhY2QyODIyYmQ5YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/wVib6HU9InkGysd4Dt/giphy.gif'
    },
    {
        id: 48, 
        isim: 'Kol Döndürme',
        talimat: 'Kollarınız omuz hizasında dümdüz yanlara açılmış şekilde olduğunuz yerde dik durun. Kollarınızı daireler çizecek şekilde ileri doğru ve daha sonra geriye doğru hareket ettirin.',
        metDegeri: 4,
        gif: 'https://i.pinimg.com/originals/aa/c3/d6/aac3d6bf65ce830db39c097e75cc93ed.gif'
    },




 
    {
        id: 49, 
        isim: 'Squat',
        talimat: 'Kalça ve gövde geride ve dizleri bükerek çök, sonra kalk ve eski pozisyonuna dön. Çök-kalk öncelikli olarak uyluk, kalça ve basen, quadriceps, hamstring ve vücudunun alt kısmını çalıştırır.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTJmMzZkMDZkZTFlN2U2MTg5NDNkNGUxNGU3N2JiMDNhOTM2N2FmYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/KVYPdHlVkXvJbY5qwu/giphy.gif'
    },
    {
        id: 50, 
        isim: 'Bacaklar Açık Squat',
        talimat: 'Ellerin kalçada ve ayakların birbirinden mümkün olduğunca açık olduğu konuma geçin. Ardından, kalçanız yere paralel olana dek çömelin. Dizlerinizin ayak parmaklarınızla aynı doğrultuda olması gerekli.',
        metDegeri: 6,
        gif: 'https://flabfix.com/wp-content/uploads/2019/06/Plie-Squat.gif'
    },
    {
        id: 51, 
        isim: 'Yan Bacak Çevirme Sol',
        talimat: 'Sağ tarafınızda yatınız ve kafanızı eliniz ile destekleyiniz. Üst de olan sol bacağınızı kaldırınız ve ayağınızı çevirmeye başlayınız.',
        metDegeri: 5,
        gif: 'https://images.squarespace-cdn.com/content/v1/5fc6ff0a82c0ab0a541ab953/1609727082332-9S7D8PKSI44GJ6YKRADR/422e3-image-asset.gif'
    },
    {
        id: 52, 
        isim: 'Yan Bacak Çevirme Sağ',
        talimat: 'Sol tarafınızda yatınız ve kafanızı eliniz ile destekleyiniz. Üst de olan Sağ bacağınızı kaldırınız ve ayağınızı çevirmeye başlayınız',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzIwZTJmYWE5ZDMxNjRiNDNiZGI0NjViZmRmZTBlMGEwMWYzNWM1YSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/OM5nSHmHOFZmqjTvlZ/giphy.gif'
    },
    {
        id: 53, 
        isim: 'Duvarda Sollu Gerdirme',
        talimat: 'Sağ elinizi duvara koyarak ayakta durun. Sol bacağınızı bükün ve sol baldırınızı sol kalçanızın yakınına getirmek için bileğinizi ya da ayak parmaklarınızı tutun. Bu pozisyonunuzu koruyun.',
        metDegeri: 3,
        gif: 'https://i.ibb.co/NF8y8CB/Ads-z.png'
    },
    {
        id: 54, 
        isim: 'Duvarda Sağlı Gerdirme',
        talimat: 'Sol elinizi duvara koyarak ayakta durun. Sağ bacağınızı bükün ve sağ baldırınızı sağ kalçanızın yakınına getirmek için bileğinizi ya da ayak parmaklarınızı tutun. Bu pozisyonunuzu koruyun.',
        metDegeri: 3,
        gif: 'https://i.ibb.co/cvd3XGS/Ads-z.png'
    },
    {
        id: 55, 
        isim: 'Dizlerden Göğüse Gerdirme',
        talimat: 'Sağ elinizi duvara koyarak ayakta durun. Sol bacağınızı bükün ve sol baldırınızı sol kalçanızın yakınına getirmek için bileğinizi ya da ayak parmaklarınızı tutun. Bu pozisyonunuzu koruyun.        ',
        metDegeri: 3,
        gif: 'https://media1.popsugar-assets.com/files/thumbor/INwpCFLYmTYRr8E-Nsw_ePta3zM/fit-in/1200x630/filters:format_auto-!!-:strip_icc-!!-:fill-!white!-/2018/04/11/713/n/40863086/6754fdac906b825f_Knee--Chest-Stretch/i/Knee-Chest-Stretch.JPG'
    },
    {
        id: 56, 
        isim: 'Yana Sıçrama',
        talimat: 'Zeminin üzerinde ayakta durun, ellerinizi önünüzde tutun ve bir taraftan diğerine zıplayın.',
        metDegeri: 8,
        gif: 'https://www.health.com/thmb/wSdDPdebYevMm0CphRcHtcBYDnY=/1200x0/filters:no_upscale():max_bytes(150000):strip_icc()/hurdle-hops-d20a7356ad32488eb252aac064590b1c.gif'
    },
    {
        id: 57, 
        isim: 'Yan Hamle',
        talimat: 'Birleşik ayaklarla dik durunuz. Sağ bacağınızı yan tarafa hareket ederek dizinizi bükünüz, sol bacağınız hareketsizdir. Başlangıç pozisyonunuza dönünüz ve aynı hareketi diyer tarafa yapınız.',
        metDegeri: 5,
        gif: 'https://media1.popsugar-assets.com/files/thumbor/Meplg7isr1eRmWNEtqd-SYJx0LA/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/08/20/695/n/1922729/2db97257dad009ed_sidelunge/i/Side-Lunge.GIF'
    },
    {
        id: 58, 
        isim: 'Kalçadan Sol Tekme',
        talimat: 'Emekleme pozisyonuna geçin ve dizler kalçanızın hizasında, eller de omuzlarınızın hizasında olsun.Ardından sol bacağınızı kaldırarak poponuzu mümkün olduğunca sıkın.',
        metDegeri: 5,
        gif: 'https://media2.popsugar-assets.com/files/2015/08/12/555/n/1922398/a215f709_best-bodies-day3-donkey-kick.xxxlarge.gif'
    },
    {
        id: 59, 
        isim: 'Kalçadan Sağ Tekme',
        talimat: 'Emekleme pozisyonuna geçin ve dizler kalçanızın hizasında, eller de omuzlarınızın hizasında olsun. Ardından sağ bacağınızı kaldırarak poponuzu mümkün olduğunca sıkın.',
        metDegeri: 5,
        gif: 'https://media2.popsugar-assets.com/files/2015/08/12/555/n/1922398/a215f709_best-bodies-day3-donkey-kick.xxxlarge.gif'
    },
    {
        id: 60, 
        isim: 'Duvarda Sumo Çömelmesi ve Baldır Kaldırma',
        talimat: 'Elleriniz duvara yaslanmış ve ayaklarınız omuz genişliğinizden hafif daha geniş açık şekilde dik durun. Kalçalarınız yere paralel olana kadar vücudunuzla çömelin. Topuklarınızı yukarı ve aşağı doğru kaldırıp indirin.',
        metDegeri: 5,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDQxYzlmNGI3YWM1ZjJmNzMyZjRmMWU1NGMxYzRmMTE3MmNkNTEwMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/KbNCQTdDqb2QzDplwW/giphy.gif'
    },
    {
        id: 61, 
        isim: 'Dizler Yukarıda',
        talimat: 'Bacaklarını dizin 90 derece olana kadar çek, bunu sağ bacağınla tekrar et, ve ileri geri devam et. Bu bacaklar ve kalça için mükemmel bir egzersizdir, ayrıca vücudun alt bölgesinin esnekliğini arttırır.',
        metDegeri: 7,
        gif: 'https://www.icegif.com/wp-content/uploads/high-knees-icegif.gif'
    },
    {
        id: 62, 
        isim: 'Yatarak Kelebek Gerdirme',
        talimat: 'Bacaklarını dizin 90 derece olana kadar çek, bunu sağ bacağınla tekrar et, ve ileri geri devam et. Bu bacaklar ve kalça için mükemmel bir egzersizdir, ayrıca vücudun alt bölgesinin esnekliğini arttırır.',
        metDegeri: 3,
        gif: 'https://wildfireyogaky.com/wp-content/uploads/2019/04/yoga-better-sleep-2.jpg'
    },
    {
        id: 63, 
        isim: 'Tek Bacak Baldır Sekme Sol',
        talimat: 'Sağ bacağınız kaldırılmış olarak dik durun. Daha sonra sol ayağınızda yukarı ve aşağı doğru sekin.',
        metDegeri: 6,
        gif: 'https://flabfix.com/wp-content/uploads/2019/06/Single-Leg-Calf-Raises.gif'
    },
    {
        id: 64, 
        isim: 'Tek Bacak Baldır Sekme Sağ',
        talimat: 'Sol bacağınız kaldırılmış olarak dik durun. Daha sonra sağ ayağınızda yukarı ve aşağı doğru sekin.',
        metDegeri: 6,
        gif: 'https://flabfix.com/wp-content/uploads/2019/06/Single-Leg-Calf-Raises.gif'
    },
    {
        id: 65, 
        isim: 'Geriye Hamle',
        talimat: 'Ayaklarınız omuz genişliğinde açık biçimde ve elleriniz kalçanız üstünde ayakta durun. Sağ bacağınızla geriye doğru büyük bir adım atın ve sol uyluğunuz yere paralel hale gelene kadar vücudunuzu alçaltın. İlk pozisyona dönün ve diğer tarafla tekrarlayın.',
        metDegeri: 5,
        gif: 'https://thumbs.gfycat.com/GrandAbleHalicore-size_restricted.gif'
    },
    {
        id: 66, 
        isim: 'Ters Kelebek Tekmesi',
        talimat: 'Bir bank üzerine yüzükoyun şekilde uzanın, vücudunuzun alt kısmını bankın kenarına koyun ve kenarlardan tutunun. Daha sonra vücudunuzun üst kısmıyla aynı hizaya gelene kadar bacaklarınızı kaldırın. Bir bacağınızı diğerinden daha yükseğe kaldırın ve yere koyun sonra diğeriyle aynı haraketi yapın',
        metDegeri: 7,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWIzMTEyOWJmZDgzYWViZjJiYTExZmFlMmM2OWQ5ZTcyZWM3OTQ2OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/54UKcrV4y9aUMSSV3J/giphy.gif'
    },
    {
        id: 67, 
        isim: 'Yan Bacak Çevirme Sol',
        talimat: 'Sağ tarafınızda yatınız ve kafanızı eliniz ile destekleyiniz. Üst de olan sol bacağınızı kaldırınız ve ayağınızı çevirmeye başlayınız.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDc5MjQ4ZWEyMTVhMTk1ZWYyNDNiZGY2YTBhZGE2ZjUwNDJlMTAyMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/avafbsu9nwpSonOyWV/giphy.gif'
    },
    {
        id: 68, 
        isim: 'Yan Bacak Çevirme Sağ',
        talimat: 'Sol tarafınızda yatınız ve kafanızı eliniz ile destekleyiniz. Üst de olan sağ bacağınızı kaldırınız ve ayağınızı çevirmeye başlayınız.',
        metDegeri: 6,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDc5MjQ4ZWEyMTVhMTk1ZWYyNDNiZGY2YTBhZGE2ZjUwNDJlMTAyMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/avafbsu9nwpSonOyWV/giphy.gif'
    },
    {
        id: 69, 
        isim: 'Sumo Squat',
        talimat: 'Ayaklarınız 6-12 inç açık şekilde ayakta durun. Kollarınızı önünüzde uzatın. Kalçalarınız yere paralel olana kadar vücudunuzla çömelin. Başlangıç pozisyonuna geri dönün ve egzersizi tekrarlayın.',
        metDegeri: 6,
        gif: 'https://hips.hearstapps.com/cosmopolitan/assets/16/21/1464361704-sumo-to-straight-squat.gif'
    },
    {
        id: 70, 
        isim: 'Yangın Musluğu Sol Bacak',
        talimat: 'Emekleme pozisyonuna geçin ve dizler kalçanızın hizasında, eller de omuzlarınızın hizasında olsun. Ardından sol bacağınızı dizinizi bükük şekilde tutarak mümkün olduğunca yana açın. Sonra başlangıç pozisyonuna geri dönün.',
        metDegeri: 6,
        gif: 'https://i.pinimg.com/originals/c1/02/ed/c102ed93d61431ba4314909a87f4d9ed.gif'
    },
    {
        id: 71, 
        isim: 'Yangın Musluğu Sağ Bacak',
        talimat: 'Emekleme pozisyonuna geçin ve dizler kalçanızın hizasında, eller de omuzlarınızın hizasında olsun. Ardından sağ bacağınızı dizinizi bükük şekilde tutarak mümkün olduğunca yana açın. Sonra başlangıç pozisyonuna geri dönün.',
        metDegeri: 6,
        gif: 'https://i.pinimg.com/originals/c1/02/ed/c102ed93d61431ba4314909a87f4d9ed.gif'
    },
    {
        id: 72, 
        isim: 'Duvara Otur',
        talimat: 'Sırtını bir duvara yerleştir, arkanı düz tut, kalçan dizlerinle dik olana kadar kalçaları indir. Bu egzersiz quadriceps kasları güçlendirmek için yapılır.',
        metDegeri: 5,
        gif: 'https://i.ibb.co/6yCmntH/walls-sits.jpg'
    },
    {
        id: 73, 
        isim: 'Reverans Hamle',
        talimat: 'Dik durunuz. Sonra sol bacağınız ile sağ tarafa geri adım atınız aynı zamanda dizlerinizi bükünüz. Başlangıç pozisyonunuza dönünüz ve aynı hareketi diyer tarafa doğru yapınız.',
        metDegeri: 5,
        gif: 'https://media1.popsugar-assets.com/files/thumbor/etFhTlqDqxb2G5NmTTXThT7UucQ/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/02/23/022/n/1922729/2c5dac7fbd305327_75aa55118c232361_EXAMPLE.curtsy-lunge/i/Curtsy-Lunges.gif'
    },
    {
        id: 74, 
        isim: 'Alt Bacak Kaldırma Sol',
        talimat: 'Yan tarafınızda sol yatın ve kafanızı elinizle destekleyiniz. Üst tarafta olan sağ bacağınızı öne doğru bükünüz ve altda kalan sol bacağınızı kaldırıp indiriniz.',
        metDegeri: 6,
        gif: 'https://www.vissco.com/wp-content/uploads/animation/sub/bottom-leg-lift.gif'
    },
    {
        id: 75, 
        isim: 'Alt Bacak Kaldırma Sağ',
        talimat: 'Yan tarafınızda sağ yatın ve kafanızı elinizle destekleyiniz. Üst tarafta olan sol bacağınızı öne doğru bükünüz ve altda kalan sağ bacağınızı kaldırıp indiriniz.',
        metDegeri: 6,
        gif: 'https://media1.popsugar-assets.com/files/thumbor/yPQUGMIoRPk0vX9pOPEaWQkHKDw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/04/28/788/n/1922729/a4b1b0f0dad1bc1f_Leg-Lift.gif'
    },
    {
        id: 76, 
        isim: 'Zıplamalı Squat',
        talimat: 'Düzenli bir ağız kavgası yapıyor başlayın, sonra karın gücü ile atlamak. Eğer arazi zaman bodur pozisyona vücut koyun. Bu büyük bir egzersiz bu sizin tüm vücudunuzu Isıtır ve karın egzersiz başlar.',
        metDegeri: 9,
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDAzNzBlMTU2MzFiMzBiYTQ3NDEyMTk2Nzc5YjQyMTI2NDMxODJmZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/2L0mkPydWsfkpV7J8n/giphy.gif'
    },
  
];

export default EGZERSIZLER;