import { Resend } from 'resend';

export async function POST(request) {
  console.log('🔵 API route called');
  
  try {
    const body = await request.json();
    const { name, email, message } = body;
    
    console.log('📝 Datos recibidos:', { name, email, message });
    console.log('🔑 RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('🔑 RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length);

    // Validar datos
    if (!name || !email || !message) {
      console.log('❌ Faltan campos requeridos');
      return Response.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Email inválido:', email);
      return Response.json(
        { error: 'Por favor ingresa un email válido' },
        { status: 400 }
      );
    }

    // Verificar API key
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      console.log('⚠️ RESEND_API_KEY no configurada. Usando modo simulación.');
      
      // Modo simulación para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      
      console.log('✅ Email simulado enviado a:', email);
      
      return Response.json(
        { 
          success: true, 
          message: 'Mensaje recibido (modo simulación)',
          simulation: true,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    }

    // Usar Resend con API key real
    console.log('🚀 Intentando enviar email con Resend...');
    const resend = new Resend(apiKey);
    
    const { data, error } = await resend.emails.send({
      from: 'Lumenae Contacto <onboarding@resend.dev>',
      to: ['lumen4e@gmail.com'], // Cambia esto por tu email real
      reply_to: email,
      subject: `📨 Nuevo mensaje de ${name} - Lumenae`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ef4444;">Nuevo mensaje de contacto - Lumenae</h2>
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Mensaje:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 12px;">
            Enviado desde el formulario de contacto de Lumenae
          </p>
        </div>
      `,
      text: `Nuevo mensaje de contacto de ${name} (${email}):\n\n${message}\n\n---\nEnviado desde Lumenae`,
    });

    if (error) {
      console.error('❌ Error de Resend:', error);
      return Response.json(
        { 
          error: 'Error al enviar el email',
          details: error.message,
          code: error.name 
        },
        { status: 500 }
      );
    }

    console.log('✅ Email enviado exitosamente:', data.id);
    return Response.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente',
        id: data.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('💥 Error en el servidor:', error);
    return Response.json(
      { 
        error: 'Error interno del servidor',
        details: error.message 
      },
      { status: 500 }
    );
  }
}