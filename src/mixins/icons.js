


export const icon = {
    computed: {
        icons() {
            const icon = this.current.icon;
            console.log(icon);

            switch (icon) {
                case "clear-day":
                    return "icon_clear_sky_day";

                case "clear-night":
                    return "icon_clear_sky_day";

                case "partly-cloudy-day":
                    return "few_clouds_day";

                case "partly-cloudy-night":
                    return "few_clouds_day";

                case "cloudy":
                    return "broken";

                case "rain":
                    return "rain";

                case "sleet":
                    return "icon_clear_sky_day";

                case "snow":
                    return "icon_snow";

                case "wind":
                    return "icon_clear_sky_day";

                case "fog":
                    return "icon_mist";

                default:
                    return "sun_rain";
            }
        },
    }
}