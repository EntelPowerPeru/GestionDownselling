import { lista_destino, lista_origen } from "./data.js";

const SET_ELEMENTOS = {
    init() {
        this.setSelects();
    },
    setSelects() {
        let html = "";

        lista_origen.forEach((e) => {
            html += `<option value="${e.origen_id}">${e.origen_nombre}</option>`;
        });

        document.querySelector("#origen_id").innerHTML = html;

        dselect(document.querySelector("#origen_id"), { search: true });
    }
};

const DOM_EVENTOS = {
    init() {
        this.listarDestinos();
    },
    listarDestinos() {
        document.querySelector("#origen_id").addEventListener("change", (evento) => {
            const origen_id = Number(evento.target.value);
            let html = "";

            if (!origen_id) {
                document.querySelector("#destinos").innerHTML = html;

                return false;
            }

            const origen = lista_origen.find(e => e.origen_id === origen_id);
            const destinos = lista_destino.filter(e => e.origen_id === origen_id);
            let html_origen_caracteristicas = "";

            origen.lista_caracteristicas.forEach(e => {
                html_origen_caracteristicas += `<li class="item-light text-success">&#9675; ${e}</li>`;
            });

            html += `
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-subtitle-2 text-success">Detalle</h3>

                        <ul class="list-light">
                            ${html_origen_caracteristicas}
                        </ul>
                    </div>
                </div>
            </div>
            `;

            destinos.forEach(e => {
                let html_ventajas = "", html_desventajas = "";

                e.lista_ventajas.forEach(f => {
                    html_ventajas += `<li class="item-light text-primary">&#10003; ${f}</li>`;
                });

                e.lista_desventajas.forEach(f => {
                    html_desventajas += `<li class="item-light text-danger">&#10005; ${f}</li>`;
                });

                html += `
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <div class="card opcion">
                        <div class="card-body">
                            <h1 class="card-title">${e.opcion_id === 1 ? "1era opción" : "2da opción"}</h1>

                            <h2 class="card-subtitle">${e.destino_nombre}</h2>

                            <div class="card border-primary mb-2">
                                <div class="card-body">
                                    <h3 class="card-subtitle-2 text-primary">Beneficios</h3>

                                    <ul class="list-light">
                                        ${html_ventajas}
                                    </ul>
                                </div>
                            </div>

                            <div class="card border-danger">
                                <div class="card-body">
                                    <h3 class="card-subtitle-2 text-danger">Pierde</h3>

                                    <ul class="list-light">
                                        ${html_desventajas}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            });

            document.querySelector("#destinos").innerHTML = html;

            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        });
    }
};

(() => {
    SET_ELEMENTOS.init();
    DOM_EVENTOS.init();
})();