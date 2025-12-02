const VideoSection = () => {
  return (
    <section id="video" className="py-20 bg-gradient-subtle">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Découvrez Secretar<span className="text-secondary">.IA</span> en action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Voyez comment notre agent IA révolutionne la gestion des réservations pour les restaurants
            </p>
          </div>

          {/* Video YouTube */}
          <div className="relative aspect-video bg-card rounded-2xl shadow-elegant overflow-hidden border-2 border-border">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/CARM0REHq94"
              title="Secretar.IA - Présentation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
