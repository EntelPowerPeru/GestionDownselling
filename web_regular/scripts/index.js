import { lista_opcion, lista_origen } from "./data.js";

const SET_ELEMENTOS = {
  init() {
    this.setSelects();
  },
  setSelects() {
    let html = "";

    lista_origen.forEach((e) => {
      html += `<option value="${e.origen_id}">${e.origen_nombre}</option>`;
    });

    document.querySelector("#formulario_web select[name=origen_id]").innerHTML =
      html;

    dselect(document.querySelector("#origen_id"), { search: true });
  },
};

const DOM_EVENTOS = {
  init() {
    this.listarOpciones();
  },
  listarOpciones() {
    document
      .querySelector("#formulario_web select[name=origen_id]")
      .addEventListener("change", (evento) => {
        const origen_id = Number(evento.target.value);
        let html = "";

        if (!origen_id) {
          document.querySelector("#destinos").innerHTML = html;

          return false;
        }

        const origen = lista_origen.find((e) => e.origen_id === origen_id);
        const opciones = lista_opcion.filter((e) => e.origen_id === origen_id);
        let html_origen_beneficios = "";

        origen.lista_beneficios.forEach((e) => {
          html_origen_beneficios += `<li class="item-light text-primary">&#10003; ${e}</li>`;
        });

        html += `
            <div class="col-12 mb-3">
                <div class="card opcion">
                    <div class="card-body">
                        <div class="card border-primary">
                            <div class="card-body">
                                <h3 class="card-subtitle-2 text-primary">Beneficios</h3>

                                <ul class="list-light">
                                    ${html_origen_beneficios}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

        opciones.forEach((e) => {
          if (!e.permite_downselling) {
            html += `<div class="col-12 col-md-6 mb-3 mb-md-0"
                                <div class="card">
                                    <div class="card-body">            
                                        <div class="alert alert-danger" role="alert">
                                            No se permite hacer downselling
                                        </div>
                                    </div>
                                </div>
                             </div>`;

            return;
          }

          let html_beneficios = "",
            html_resumen = "",
            html_ahorro = "";

          e.lista_beneficios?.forEach((f) => {
            html_beneficios += `<li class="item-light text-primary">&#10003; ${f}</li>`;
          });

          e.lista_resumen?.forEach((f) => {
            html_resumen += `<li class="item-light text-danger">&#9942; ${f}</li>`;
          });

          html_ahorro += `<li class="item-light text-warning">&#10039; S/.${e.ahorro_anual} al año</li>`;

          html += `
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                    <div class="card opcion">
                        <div class="card-body">
                            <h1 class="card-title">${
                              e.opcion_id === 1 ? "Opción 1" : "Opción 2"
                            } - ${e.plan_nombre}</h1>
                            
                            ${
                              e.lista_beneficios
                                ? `
                            <div class="card border-primary mb-2">
                                        <div class="card-body">
                                            <h3 class="card-subtitle-2 text-primary">Beneficios</h3>

                                            <ul class="list-light">
                                                ${html_beneficios}
                                            </ul>
                                        </div>
                                    </div>
                            `
                                : ""
                            }

                            ${
                              e.lista_resumen
                                ? `
                            <div class="card border-danger mb-2">
                                <div class="card-body">
                                    <h3 class="card-subtitle-2 text-danger">Cambios con el nuevo Plan</h3>

                                    <ul class="list-light">
                                        ${html_resumen}
                                    </ul>
                                </div>
                            </div>
                            `
                                : ""
                            }

                            ${
                              e.ahorro_anual
                                ? `
                            <div class="card border-warning">
                                <div class="card-body">
                                    <h3 class="card-subtitle-2 text-warning">Ahorra</h3>

                                    <ul class="list-light">
                                        ${html_ahorro}
                                    </ul>
                                </div>
                            </div>
                            `
                                : ""
                            }
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector("#formulario_web .opciones").innerHTML = html;

        const tooltipTriggerList = document.querySelectorAll(
          "[data-bs-toggle='tooltip']"
        );
        const tooltipList = [...tooltipTriggerList].map(
          (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
        );
      });
  },
};

(() => {
  SET_ELEMENTOS.init();
  DOM_EVENTOS.init();
})();
