// Ajoute un popup de confirmation avant la suppression d'un historique
document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', function () {
    // Récupère le formulaire parent associé au bouton
    const form = this.closest('.delete-form');
    const id = form.dataset.id;

    // Affiche une popup SweetAlert pour confirmer la suppression
    Swal.fire({
      title: 'Supprimer ?',
      text: 'Cette reconnaissance sera définitivement supprimée.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      // Si l'utilisateur confirme, soumet le formulaire de suppression
      if (result.isConfirmed) {
        form.submit(); // Envoie le formulaire
      }
    });
  });
});
