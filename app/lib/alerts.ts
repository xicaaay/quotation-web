import Swal from "sweetalert2";

const base = { confirmButtonColor: "#18181b", cancelButtonColor: "#e4e4e7", buttonsStyling: true };
export const alerts = {
  loading(title = "Procesando...") { Swal.fire({ title, allowOutsideClick: false, allowEscapeKey: false, didOpen: () => Swal.showLoading() }); },
  close() { Swal.close(); },
  success(title: string, text?: string) { return Swal.fire({ ...base, icon: "success", title, text, confirmButtonText: "Entendido" }); },
  error(title: string, text?: string) { return Swal.fire({ ...base, icon: "error", title, text, confirmButtonText: "Cerrar" }); },
  confirm(title: string, text: string, confirmButtonText = "Confirmar") {
    return Swal.fire({ ...base, icon: "warning", title, text, showCancelButton: true, confirmButtonText, cancelButtonText: "Cancelar", reverseButtons: true });
  },
};
