<!-- <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('from');
            $table->date('to');
            $table->decimal('total_budget', 15, 2);
            $table->decimal('daily_budget', 15, 2);
            $table->json('creatives')->nullable(); // To store multiple images
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('campaigns');
    }
}; -->
