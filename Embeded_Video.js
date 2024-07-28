var embeded_vimeo_video_count = 0;
var embeded_video_amount = document.querySelectorAll(".embeded_video").length;

for (var i = 1; i <= embeded_video_amount; i++) {

    switch (document.querySelectorAll(".embeded_video")[i - 1].getAttribute("type")) {
        case "youtube":
            document.querySelectorAll(".embeded_video")[i - 1].innerHTML = '<iframe src="https://www.youtube.com/embed/' + document.querySelectorAll(".embeded_video")[i - 1].getAttribute("youtubeID") + '?enablejsapi=1&html5=1" frameborder="0" allowfullscreen></iframe>'
            break;
        case "vimeo":
            document.querySelectorAll(".embeded_video")[i - 1].innerHTML = '<div class="embeded_vimeo_video" id="embeded_vimeo_id' + i + '" style="opacity:0"></div>';
            const options = {
                object: document.querySelectorAll(".embeded_video .embeded_vimeo_video")[embeded_vimeo_video_count],
                id: document.querySelectorAll(".embeded_video")[i - 1].getAttribute("vimeoID"),
                loop: false,
                title: true,
                autopause: false,
                background: false,
                byline: true,
                controls: true,
                transcript: true,
                dnt: true
            };
            const embeded_player = new Vimeo.Player("embeded_vimeo_id" + i, options);
            //embeded_player.setVolume(0);
            Promise.all([embeded_player.getVideoWidth(), embeded_player.getVideoHeight()]).then(function(dimensions) {
                var width = dimensions[0];
                var height = dimensions[1];
                var vimeo_aspert_ratio = width / height;
                console.log(vimeo_aspert_ratio);
                //gsap.set("#"+options.object.id+" iframe", {width:"100%", height:100*vimeo_aspert_ratio+"%"});
                gsap.set("#" + options.object.id, {
                    opacity: 1
                });
                //embeded_player.play();
            });
            embeded_vimeo_video_count++;

            break;
    }

}