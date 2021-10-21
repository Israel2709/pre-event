let database = firebase.database()
let eventRef = database.ref("events/ciosummit")
let speakersRef = database.ref("speakers")
let sponsorsRef = database.ref("sponsors")
let eventData;
let speakersList;
let sponsorsList;

const getSpeakers = async () => {
    let result = await fetch("https://idc-latam-default-rtdb.firebaseio.com/speakers/.json")
    return await result.json()
}

const getSponsors = async () => {
    let result = await fetch("https://idc-latam-default-rtdb.firebaseio.com/sponsors/.json")
    return await result.json()
}

const showSpeakerModal = data => {
    console.log(data)
    console.log(speakersList)
    console.log(speakersList[data])
    let { name, picture, bio } = speakersList[data]
    $("#speaker-modal #title").text(name)
    $("#speaker-modal #bio").text(bio.es)
    $("#speaker-modal #picture").attr("src", picture)
    $("#speaker-modal").modal("show")
}
$(document).ready(function () {
    eventRef.once('value').then(async snapshot => {
        console.log(snapshot.val())
        eventData = snapshot.val()
        console.log(eventData)
        let {
            about,
            abstract,
            agenda,
            hasSlider,
            heroImg,
            heroImgResponsive,
            headerCta,
            name,
            sponsorsTitle,
            sponsorsDescription,
            slogan,
            speakers,
            sponsors,
            subtitle,
            title,
            ejes
        } = snapshot.val()
        speakersList = await getSpeakers()
        sponsorsList = await getSponsors()
        console.log(speakersList)
        console.log(sponsorsList)
        $("#hero-img").attr("src", heroImg)
        $("#header-cta").attr("href", headerCta.link).find("button").text(headerCta.label)
        $("#title").text(title)
        $("#subtitle").text(subtitle)
        $("#slogan").text(slogan)
        $("#abstract").text(abstract)
        $("#agenda-title").text(agenda.title)
        $("#agenda-description").text(agenda.description)
        $("#sponsors #sponsors-title").text(sponsorsTitle || "")
        $("#sponsors #sponsors-description").text(sponsorsDescription || "")
        speakers.forEach((speakerSection, index) => {
            $("#speakers-wrapper").append(`
                <div class="col-12">
                    <h3 class="text-dark text-gradient w-fit-content mb-3">${speakerSection.section}</h3>
                </div>
                <div class="col-12">
                <div id="speakers-${index}" class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 px-md-8"></div>
                </div>
                
            `)
            let sectionContent = speakerSection.speaker.reduce((accum, current, index) => {
                console.log(speakersList[current])
                let speakerData = speakersList[current]
                let { avatar, bio, business, job, name, picture } = speakerData
                return accum + `
                <div class="col">
                    <div class="card card-profile speaker-card h-100 mb-3">
                        <div class="p-3">
                            <img class="w-100 border-radius-md" src=${picture}>
                        </div>
                        <div class="cAard-body blur justify-content-center text-center mt-n5 mx-4 border-radius-md d-flex flex-column h-100">
                            <h4 class="mb-0">${name}</h4>
                            <p class="mb-0 speaker-role"><b>${job}</b></p>
                            <p class="mb-2">${business}</p>
                            <button type="button" class="btn bg-gradient-info" style="margin-top:auto; width:100%" onclick="showSpeakerModal('${current}')">Bio</button>
                        </div>
                    </div>
                </div>
                
            `
            }, "")
            $(`#speakers-${index}`).append(sectionContent)
        })
        sponsors.forEach((sponsor, index) => {
            console.log(sponsor)
            console.log(sponsorsList[sponsor.name])
            let { ico, name, links, boilerplate } = sponsorsList[sponsor.name]
            $("#sponsors-wrapper").append(`
            <div class="col-md-3 mb-md-0 mb-7">
                <div class="card sponsor-card">
                    <div class="text-center mt-n5 z-index-1">
                        <div class="position-relative">
                            <div class="blur-shadow-avatar">
                                <img class="avatar avatar-xxl shadow-lg" src=${ico}>
                            </div>
                        </div>
                    </div>
                    <div class="card-body text-center pb-0">
                        <h4 class="mb-0">${name}</h4>
                        <p><a href="https://${links.web}" target="_blank">${links.web}</a> </p>
                        <p class="mt-2 abstract">${boilerplate}
                        </p>
                    </div>
                </div>
            </div>
            `)
        })
        $("#ejes .cover").attr("src", ejes.cover)
        ejes.ejes.forEach( eje => {
            $("#ejes-wrapper").append(`
            <div class="card card-plain card-blog mb-3">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card-image position-relative border-radius-lg">
                                <div class="blur-shadow-image">
                                    <img class="img border-radius-lg"
                                        src=${eje.cover}>
                                </div>
                                <div class="colored-shadow"
                                    style="background-image: url(${eje.cover});">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 my-auto ms-md-3 mt-md-auto mt-4">
                            <h3>
                                <a href="javascript:;" class="text-dark font-weight-normal">${eje.title}</a>
                            </h3>
                            <p>
                                ${eje.description}
                            </p>
                        </div>
                    </div>
                </div>
            `)
        })
        $("#contact .title").text(about.title)
        $("#contact .description").text(about.description)
        about.contactos.forEach( contacto => {
            $(".contact-wrapper").append(`
                <div class="contact-block w-100 w-md-50">
                    <p class="mt-4 text-white opacity-8 z-index-1">${contacto.name} <br> ${contacto.job}</p>
                    <div class="d-flex text-white opacity-8">
                        <div>
                            <i class="fas fa-envelope text-sm"></i>
                        </div>
                        <div class="ps-3">
                            <span class="text-sm text-white"><a href="mailto:${contacto.mail}" class="text-white">${contacto.mail}</a></span>
                        </div>
                    </div>
                </div>
            `)
        })
    })
})

/*
const sponsorcard = ""*/