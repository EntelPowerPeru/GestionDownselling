import { lista_opciones, lista_lineas, lista_origen } from "./data.js";

const SET_ELEMENTOS = {
    init() {
        this.setSelects();
    },
    setSelects() {
        let origen_html = "";
        let lineas_html = "";

        // Origen

        let lista_origen_sin_duplicados = lista_origen.map(e => e.origen_nombre);
        lista_origen_sin_duplicados = [...new Set(lista_origen_sin_duplicados)];
        lista_origen_sin_duplicados.forEach((e) => {
            origen_html += `<option value="${e}">${e}</option>`;
        });

        document.querySelector("#origen_nombre").innerHTML = origen_html;
        dselect(document.querySelector("#origen_nombre"), { search: true });

        // Líneas
        lista_lineas.forEach((e) => {
            lineas_html += `<option value="${e.linea_id}">${e.linea_nombre}</option>`;
        });

        document.querySelector("#numero_lineas").innerHTML = lineas_html;
    }
};

const DOM_EVENTOS = {
    init() {
        this.listarDestinos();
    },
    listarDestinos() {
        document.querySelectorAll("select").forEach(elemento => {
            elemento.addEventListener("change", (evento) => {
                const origen_nombre = document.querySelector("#origen_nombre").value;
                const numero_lineas = Number(document.querySelector("#numero_lineas").value);
                let html = "";

                if (!origen_nombre || !numero_lineas) {
                    document.querySelector("#destinos").innerHTML = html;

                    return false;
                }

                const origen = lista_origen.find(e => e.origen_nombre === origen_nombre && e.q_linea === numero_lineas);
                const opciones = lista_opciones.filter(e => e.origen_nombre === origen_nombre && e.q_linea === numero_lineas);
                let origen_beneficios_html = "";
                let origen_ahorro_anual_html = "";

                origen.lista_beneficios.forEach(e => {
                    origen_beneficios_html += `<li class="text-white fst-italic">&#10003; ${e}</li>`;
                });

                origen_ahorro_anual_html += `<li class="text-white fst-italic">&#9675; ${origen.ahorro_anual === "-" ? origen.ahorro_anual : `S/${origen.ahorro_anual} al año`}</li>`;

                html += `
                <div class="col-12 mb-3">
                    <div class="card-sm bg-cyan--transparent">
                        <h1 class="fs-5 text-white">Beneficios de Plan Actual</h1>
        
                        <ul class="list-light">
                            ${origen_beneficios_html}
                        </ul>
                    </div>
                </div>
                `;

                opciones.forEach(e => {
                    let opcion_beneficios_html = "";
                    let opcion_cambios_html = "";
                    let opcion_total_mes_sin_plan_familia_html = "";
                    let opcion_total_mes_con_plan_familia_html = "";
                    let opcion_ahorro_anual_html = "";

                    e.lista_beneficios.forEach(f => {
                        opcion_beneficios_html += `<li class="item-light text-primary">&#10003; ${f}</li>`;
                    });

                    e.lista_cambios.forEach(f => {
                        opcion_cambios_html += `<li class="item-light ${f.toLowerCase().includes("gana") ? "text-success" : "text-danger"}">${f.toLowerCase().includes("gana") ? "&#10003;" : "&#10005;"} ${f}</li>`;
                    });

                    opcion_total_mes_sin_plan_familia_html = e.total_mes_sin_plan_familia === "-" ? "" : `<p class="paragraph-light mb-1"><b>Total mes <b>SIN</b> plan familia:</b> S/${e.total_mes_sin_plan_familia}</p>`;

                    opcion_total_mes_con_plan_familia_html = e.total_mes_con_plan_familia === "-" ? "" : `<p class="paragraph-light mb-1"><b>Total mes <b>CON</b> plan familia:</b> S/${e.total_mes_con_plan_familia}</p>`;

                    opcion_ahorro_anual_html = e.ahorro_anual === "-" ? "" : `<p class="paragraph-light mb-1"><b>Ahorro <b>CON</b> plan familia:</b> S/${e.ahorro_anual} al año</p>`;

                    html += `
                    <div class="col-md-6 mb-3 mb-md-0">
                        <div class="card opcion">
                            <div class="card-body">
                                <h1 class="card-subtitle">${e.opcion_id === 1 ? "Opción 1" : "Opción 2"} - ${e.opcion_nombre}</h1>

                                <div class="card border-primary mb-2">
                                    <div class="card-body">
                                        <h3 class="card-subtitle-2 text-primary">Beneficios</h3>

                                        <ul class="list-light">
                                            ${opcion_beneficios_html}
                                        </ul>
                                    </div>
                                </div>

                                <div class="card border-info mb-4">
                                    <div class="card-body">
                                        <h3 class="card-subtitle-2 text-info">Cambios con el nuevo plan</h3>

                                        <ul class="list-light">
                                            ${opcion_cambios_html}
                                        </ul>
                                    </div>
                                </div>

                                ${opcion_total_mes_sin_plan_familia_html}

                                ${opcion_total_mes_con_plan_familia_html}
                                
                                ${opcion_ahorro_anual_html}
                            </div>
                        </div>
                    </div>
                    `;
                });

                document.querySelector("#destinos").innerHTML = html;

                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
                const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
            });
        });
    }
};

(() => {
    SET_ELEMENTOS.init();
    DOM_EVENTOS.init();
})();